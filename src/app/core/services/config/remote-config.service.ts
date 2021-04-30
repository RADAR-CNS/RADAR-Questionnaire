import 'rxjs/add/operator/mergeMap'

import { Injectable } from '@angular/core'
import { FirebaseX } from '@ionic-native/firebase-x/ngx'
import { Platform } from 'ionic-angular'
import { BehaviorSubject, Observable, from } from 'rxjs'

import { ConfigKeys } from '../../../shared/enums/config'
import { StorageKeys } from '../../../shared/enums/storage'
import { getSeconds } from '../../../shared/utilities/time'
import { LogService } from '../misc/log.service'
import { StorageService } from '../storage/storage.service'

declare var FirebasePlugin

@Injectable()
export class RemoteConfigService {
  protected timeoutMillis: number = 10_800_000

  constructor(private storage: StorageService) {
    this.storage.get(StorageKeys.REMOTE_CONFIG_CACHE_TIMEOUT).then(timeout => {
      if (timeout) {
        this.timeoutMillis = timeout
      } else {
        this.timeoutMillis = 10_800_000 // 3 hours
        return this.storage.set(
          StorageKeys.REMOTE_CONFIG_CACHE_TIMEOUT,
          this.timeoutMillis
        )
      }
    })
  }

  setCacheExpiration(timeoutMillis: number): Promise<number> {
    return this.storage
      .set(StorageKeys.REMOTE_CONFIG_CACHE_TIMEOUT, timeoutMillis)
      .then(timeout => {
        if (timeout) {
          this.timeoutMillis = timeout
        }
        return timeoutMillis
      })
  }

  read(): Promise<RemoteConfig> {
    throw new Error('RemoteConfigService method not implemented')
  }

  forceFetch(): Promise<RemoteConfig> {
    throw new Error('RemoteConfigService method not implemented')
  }

  subject(): Observable<RemoteConfig> {
    throw new Error('RemoteConfigService method not implemented')
  }
}

export interface RemoteConfig {
  readonly fetchedAt: Date

  get(key: ConfigKeys): Promise<string | null>
  getOrDefault(key: ConfigKeys, defaultValue: string): Promise<string>
}

class EmptyRemoteConfig implements RemoteConfig {
  readonly fetchedAt = new Date(0)

  get(key: ConfigKeys): Promise<any> {
    return Promise.resolve()
  }
  getOrDefault(key: ConfigKeys, defaultValue: any): Promise<string> {
    return Promise.resolve(defaultValue)
  }
}

class FirebaseRemoteConfig implements RemoteConfig {
  readonly fetchedAt = new Date()
  cache: { [key: string]: string } = {}

  constructor(private firebase: FirebaseX, private logger: LogService) {}

  get(key: ConfigKeys): Promise<string | null> {
    const cachedValue = this.cache[key.value]
    if (cachedValue !== undefined) {
      this.logger.log(`Retrieving ${key.value} from cache`)
      return Promise.resolve(cachedValue)
    }
    this.logger.log(`Retrieving ${key.value}`)
    return this.firebase.getValue(key.value)
  }

  getOrDefault(key: ConfigKeys, defaultValue: string): Promise<string> {
    return this.get(key)
      .then((val: string) => (val.length == 0 ? defaultValue : val))
      .catch(e => {
        this.logger.error(
          `Failed to retrieve ${key.value}. Using default ${defaultValue}.`,
          e
        )
        return defaultValue
      })
  }
}

@Injectable()
export class FirebaseRemoteConfigService extends RemoteConfigService {
  private readonly configSubject: BehaviorSubject<RemoteConfig>

  constructor(
    private firebase: FirebaseX,
    storage: StorageService,
    private logger: LogService,
    private platform: Platform
  ) {
    super(storage)
    this.configSubject = new BehaviorSubject(new EmptyRemoteConfig())
  }

  forceFetch(): Promise<RemoteConfig> {
    return this.fetch(0)
  }

  read(): Promise<RemoteConfig> {
    const currentValue = this.configSubject.value
    const nextFetch = currentValue.fetchedAt.getTime() + this.timeoutMillis
    if (new Date().getTime() <= nextFetch) {
      return Promise.resolve(currentValue)
    }

    return this.fetch(this.timeoutMillis)
  }

  sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  private async fetch(timeoutMillis: number) {
    await this.sleep(200)
    if (!this.platform.is('cordova')) {
      console.log('Not fetching Firebase Remote Config without cordova')
      return Promise.resolve(this.configSubject.value)
    }
    console.log('Fetching Firebase Remote Config')
    return this.firebase
      .fetch(getSeconds({ milliseconds: timeoutMillis }))
      .then(() => this.firebase.activateFetched())
      .then(activated => {
        console.log('New Firebase Remote Config did activate', activated)
        const conf = new FirebaseRemoteConfig(this.firebase, this.logger)
        if (activated) {
          this.configSubject.next(conf)
        }
        return conf
      })
  }

  subject(): Observable<RemoteConfig> {
    return from(this.read()).mergeMap(() => this.configSubject)
  }
}
