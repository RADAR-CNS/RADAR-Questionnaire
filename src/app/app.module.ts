import { HttpClientModule } from '@angular/common/http'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt'
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx'
import { AppVersion } from '@ionic-native/app-version/ngx'
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'
import { Device } from '@ionic-native/device/ngx'
import { Dialogs } from '@ionic-native/dialogs/ngx'
import { File } from '@ionic-native/file/ngx'
import { FirebaseX } from '@ionic-native/firebase-x/ngx'
import { Globalization } from '@ionic-native/globalization/ngx'
import { Insomnia } from '@ionic-native/insomnia/ngx'
import { Keyboard } from '@ionic-native/keyboard/ngx'
import { LocalNotifications } from '@ionic-native/local-notifications/ngx'
import { MobileAccessibility } from '@ionic-native/mobile-accessibility/ngx'
import { SplashScreen } from '@ionic-native/splash-screen/ngx'
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Vibration } from '@ionic-native/vibration/ngx'
import { WebIntent } from '@ionic-native/web-intent/ngx'
import { IonicStorageModule, Storage } from '@ionic/storage'
import { IonicApp, IonicModule } from 'ionic-angular'

import { AppComponent } from './core/containers/app.component'
import {
  FirebaseRemoteConfigService,
  RemoteConfigService
} from './core/services/config/remote-config.service'
import { LogService } from './core/services/misc/log.service'
import { PagesModule } from './pages/pages.module'
import { AndroidPermissionUtility } from './shared/utilities/android-permission'
import { jwtOptionsFactory } from './shared/utilities/jwtOptionsFactory'
import { Utility } from './shared/utilities/util'
import {AppLauncher} from "@ionic-native/app-launcher/ngx";

@NgModule({
  imports: [
    PagesModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(AppComponent, {
      mode: 'md',
      activator: 'none',
      scrollAssist: false,
      autoFocusAssist: false,
    }),
    IonicStorageModule.forRoot({
      name: '__appdb',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  declarations: [AppComponent],
  bootstrap: [IonicApp],
  entryComponents: [AppComponent],
  providers: [
    Device,
    StatusBar,
    SplashScreen,
    Utility,
    BarcodeScanner,
    Dialogs,
    Vibration,
    Globalization,
    AndroidPermissionUtility,
    AndroidPermissions,
    File,
    AppVersion,
    WebIntent,
    MobileAccessibility,
    Insomnia,
    BackgroundMode,
    Keyboard,
    FirebaseX,
    LocalNotifications,
    LogService,
    AppLauncher,
    { provide: RemoteConfigService, useClass: FirebaseRemoteConfigService },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
