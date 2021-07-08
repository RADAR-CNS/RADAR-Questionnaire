import { HttpClient, HttpHandler } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'

import {
  FirebaseAnalyticsServiceMock,
  LogServiceMock,
  RemoteConfigServiceMock,
  SubjectConfigServiceMock,
  UtilityMock
} from '../../../shared/testing/mock-services'
import { LogService } from '../misc/log.service'
import { AnalyticsService } from '../usage/analytics.service'
import { ProtocolService } from './protocol.service'
import { RemoteConfigService } from './remote-config.service'
import { SubjectConfigService } from './subject-config.service'
import { Utility } from '../../../shared/utilities/util'

describe('ProtocolService', () => {
  let service

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        ProtocolService,
        HttpClient,
        HttpHandler,
        { provide: SubjectConfigService, useClass: SubjectConfigServiceMock },
        { provide: RemoteConfigService, useClass: RemoteConfigServiceMock },
        { provide: LogService, useClass: LogServiceMock },
        {
          provide: AnalyticsService,
          useClass: FirebaseAnalyticsServiceMock
        },
        { provide: Utility, useClass: UtilityMock }
      ]
    })
  )

  beforeEach(() => {
    service = TestBed.get(ProtocolService)
  })

  it('should create', () => {
    expect(service instanceof ProtocolService).toBe(true)
  })

})
