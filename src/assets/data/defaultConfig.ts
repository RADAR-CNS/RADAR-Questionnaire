import { LocKeys } from '../../app/shared/enums/localisations'
import { AssessmentType } from '../../app/shared/models/assessment'
import { QuestionType } from '../../app/shared/models/question'
import {
  LanguageSetting,
  NotificationSettings,
  WeeklyReportSubSettings
} from '../../app/shared/models/settings'
import { Task } from '../../app/shared/models/task'
import { Localisations } from './localisations'

// DEFAULT APP INFO

// *Title of RADAR base platform instance (REMOTE CONFIG KEY: `platform_instance`)
export const DefaultPlatformInstance = 'RADAR-CNS'

// *Default app version
export const DefaultAppVersion = '2.0.2-alpha'

// *Default Android package name
export const DefaultPackageName = 'org.phidatalab.radar_armt'

// *Default iOS app id
export const DefaultAppId = ''

// DEFAULT SOURCE INFO
// *This is the default source info and description for the aRMT app in RADAR base.
// *NOTE: These details must match the schema specification files.

export const DefaultSourcePrefix = 'aRMT'
export const DefaultSourceTypeModel: string = `${DefaultSourcePrefix}-App`
export const DefaultSourceTypeRegistrationBody = {
  sourceTypeCatalogVersion: '1.5.0',
  sourceTypeModel: DefaultSourceTypeModel,
  sourceTypeProducer: 'RADAR'
}

// *The icon for On Demand assessments  (REMOTE CONFIG KEY: `on_demand_assessment_icon`)
export const DefaultOnDemandAssessmentIcon = 'assets/imgs/new-questionnaire.png'

// *The label/title for On Demand assessments  (REMOTE CONFIG KEY: `on_demand_assessment_label`)
// *The format/type is LanguageSetting
export const DefaultOnDemandAssessmentLabel = JSON.stringify(
  Localisations['ON_DEMAND_TASKS']
)

// *The app credits title found in the popup when tapping the logo on the left side of the home page
// (REMOTE CONFIG KEY: `app_credits_title`)
// *The format/type is LanguageSetting
export const DefaultAppCreditsTitle = JSON.stringify(
  Localisations['CREDITS_TITLE']
)

// *The app credits body found in the popup when tapping the logo on the left side of the home page
// (REMOTE CONFIG KEY: `app_credits_body`)
// *The format/type is LanguageSetting
export const DefaultAppCreditsBody = JSON.stringify(
  Localisations['CREDITS_BODY']
)

// DEFAULT URI

// *The Default endpoint where the RADAR-base platform is hosted
export const DefaultEndPoint: string =
  'https://radar-cns-platform.rosalind.kcl.ac.uk'

export const DefaultManagementPortalURI = '/managementportal'
export const DefaultRefreshTokenURI = '/oauth/token'
export const DefaultSubjectsURI = '/api/subjects/'
export const DefaultMetaTokenURI: string = '/api/meta-token/'
export const DefaultEnrolmentBaseURL =
  DefaultEndPoint + DefaultManagementPortalURI
export const DefaultKafkaURI = '/kafka'
export const DefaultQuestionnaireTypeURI = '_armt'
export const DefaultQuestionnaireFormatURI = '.json'

export const DefaultGooglePlaystoreAppURL =
  'https://play.google.com/store/apps/details?id='
export const DefaultAppleAppStoreAppURL = 'https://apps.apple.com/app/'

// DEFAULT SCHEDULE SETUP

// *Default general task completion window or time window in which the task is available to answer (1 day in ms)
export const DefaultTaskCompletionWindow = 86400000

// *Default ESM completion window (10 mins in ms)
export const DefaultESMCompletionWindow = 600000

// *Default sample task
export const DefaultTask: Task = {
  index: 0,
  type: AssessmentType.SCHEDULED,
  completed: false,
  reportedCompletion: false,
  timestamp: 0,
  name: 'DEFAULT',
  nQuestions: 0,
  estimatedCompletionTime: 0,
  completionWindow: DefaultTaskCompletionWindow,
  warning: '',
  notifications: [],
  timeCompleted: 0,
  showInCalendar: true,
  isDemo: false,
  order: 0
}

// *Default schedule coverage in years (length of schedule to generate tasks until)
export const DefaultScheduleYearCoverage: number = 3

// *Default time interval of protocol
export const DefaultScheduleTimeInterval = { unit: 'day', amount: 1 }

// *Default schedule/protocol version
export const DefaultScheduleVersion = '0.3.10'

// *Default max number of completion logs to send on app start
export const DefaultNumberOfCompletionLogsToSend = 10

// DEFAULT NOTIFICATION SETUP

// *Default notification type (either 'FCM_XMPP', 'FCM_REST' or 'LOCAL' notifications)
export const DefaultNotificationType: string = 'FCM_XMPP'

// *Default app server URL
export const DefaultAppServerURL = DefaultEndPoint + '/appserver'

// *Default FCM sender ID from Firebase settings
export const FCMPluginProjectSenderId: string = '430900191220'

// *Default maximum upstream retries when sending fails
export const DefaultMaxUpstreamResends = 100

// *Default number of notifications to schedule
export const DefaultNumberOfNotificationsToSchedule: number = 100

// *Default length of time to wait before refreshing notifications (15 mins in ms)
export const DefaultNotificationRefreshTime: number = 900000

// *Default TTL or lifespan of FCM notifications (will try to send during lifespan before being discarded) (10 mins)
export const DefaultNotificationTtlMinutes: number = 10

// DEFAULT GITHUB SOURCES

export const GIT_API_URI = 'https://api.github.com/repos'

// *The Github content fetching mechanism, if this is done by a direct request to Github or a request through the app server. (REMOTE CONFIG KEY: `github_fetch_strategy`, VALUES: `default` (direct to Github) or `appserver`)
export const DefaultGithubFetchStrategy = 'default'

// *The Github repository where the protocols are located (REMOTE CONFIG KEY: `protocol_repo`)
export const DefaultProtocolGithubRepo = 'RADAR-Base/RADAR-aRMT-protocols'

// *The name of the branch where the protocol definitions should be read from (REMOTE CONFIG KEY: `protocol_branch`)
export const DefaultProtocolBranch = 'master'

// *The path inside a project name that should be read for a protocol (REMOTE CONFIG KEY: `protocol_path`)
export const DefaultProtocolPath = `protocol.json`

// *The name of the repository where the questionnaire schemas are located
export const DefaultSchemaGithubRepo = 'RADAR-Base/RADAR-Schemas'

// *The name of the branch in the schema repository
export const DefaultSchemaBranch = 'master'

// *The path to the schema specifications file
// tslint:disable-next-line: max-line-length
export const DefaultSchemaSpecPath = `specifications/active/${DefaultSourcePrefix}-${DefaultSourceTypeRegistrationBody.sourceTypeCatalogVersion}.yml?ref=${DefaultSchemaBranch}`

// *The URL of the Kafka topic specification (REMOTE CONFIG KEY: `kafka_specification_url`)
export const DefaultSchemaSpecEndpoint = [
  GIT_API_URI,
  DefaultSchemaGithubRepo,
  'contents',
  DefaultSchemaSpecPath
].join('/')

// *The order in which participant attributes are matched to protocol endpoints; format: {attributeName: orderNumber}
export const DefaultParticipantAttributeOrder = {
  'Human-readable-identifier': -1
}

// DEFAULT AUTH DATA

// * Default oAuth client id (REMOTE CONFIG KEY: `oauth_client_id`)
export const DefaultOAuthClientId = 'aRMT'

// * Default oAuth client secret (REMOTE CONFIG KEY: `oauth_client_secret`)
export const DefaultOAuthClientSecret = ''

// *Default length of time to wait before refreshing tokens (REMOTE CONFIG KEY: `oauth_refresh_seconds`)
export const DefaultTokenRefreshSeconds = 1800 // 30 minutes in s

// DEFAULT HTTP REQUEST VALUES

// *Default HTTP request encoded content type
export const DefaultRequestEncodedContentType =
  'application/x-www-form-urlencoded'

// *Default HTTP request JSON content type
export const DefaultRequestJSONContentType = 'application/json'

// *Default HTTP request Kafka content type
export const DefaultKafkaRequestContentType =
  'application/vnd.kafka.avro.v2+json'

// *Default HTTP request client accept type
export const DefaultClientAcceptType =
  'application/vnd.kafka.v2+json, application/vnd.kafka+json; q=0.9, application/json; q=0.8'

// DEFAULT QUESTIONNAIRE COMPONENT SETUP

// *Default audio input/recording attempts allowed
export const DefaultMaxAudioAttemptsAllowed = 5

// *Default audio recording settings (sampling rate: 44.1kHz, 32kHz, 16kHz, 12kHz, or 8kHz)
export const DefaultAudioRecordOptions = {
  SampleRate: 16000,
  NumberOfChannels: 1
}

// *Default question/question input types where the questionnaire will automatically move to the next question upon answering the question.
export const DefaultAutoNextQuestionnaireTypes = [
  QuestionType.timed,
  QuestionType.audio
]

// *Default question/question input types where the next button is enabled by default, allowing the question to be skippable.
export const DefaultSkippableQuestionnaireTypes = [QuestionType.audio]

// DEFAULT GENERAL SETUP
// *Default notification, report, and language settings

export const DefaultSettingsNotifications: NotificationSettings = {
  sound: true,
  vibration: false,
  nightMode: true
}

export const DefaultSettingsWeeklyReport: WeeklyReportSubSettings[] = [
  {
    name: LocKeys.MEASURE_PROGRESS.toString(),
    show: false
  },
  {
    name: LocKeys.MEASURE_STEPS.toString(),
    show: false
  },
  {
    name: LocKeys.MEASURE_HEART_RATE.toString(),
    show: false
  }
]

export const DefaultLanguage: LanguageSetting = {
  label: LocKeys.LANGUAGE_ENGLISH.toString(),
  value: 'en'
}

export const DefaultSettingsSupportedLanguages: LanguageSetting[] = [
  {
    label: LocKeys.LANGUAGE_ENGLISH.toString(),
    value: 'en'
  },
  {
    label: LocKeys.LANGUAGE_ITALIAN.toString(),
    value: 'it'
  },
  {
    label: LocKeys.LANGUAGE_SPANISH.toString(),
    value: 'es'
  },
  {
    label: LocKeys.LANGUAGE_DUTCH.toString(),
    value: 'nl'
  },
  {
    label: LocKeys.LANGUAGE_DANISH.toString(),
    value: 'da'
  },
  {
    label: LocKeys.LANGUAGE_GERMAN.toString(),
    value: 'de'
  },
  {
    label: LocKeys.LANGUAGE_POLISH.toString(),
    value: 'pl'
  },
  {
    label: LocKeys.LANGUAGE_HEBREW.toString(),
    value: 'hb'
  }
]

export const DefaultQuestionsHidden = '{}'
