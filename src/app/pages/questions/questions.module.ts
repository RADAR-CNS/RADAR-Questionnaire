import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'

import { PipesModule } from '../../shared/pipes/pipes.module'
import { FinishComponent } from './components/finish/finish.component'
import { IntroductionComponent } from './components/introduction/introduction.component'
import { QuestionModule } from './components/question/question.module'
import { ToolbarComponent } from './components/toolbar/toolbar.component'
import { QuestionsPageComponent } from './containers/questions-page.component'
import { AnswerService } from './services/answer.service'
import { AudioRecordService } from './services/audio-record.service'
import { FinishTaskService } from './services/finish-task.service'
import { QuestionsService } from './services/questions.service'
import { TimestampService } from './services/timestamp.service'
import {FinishAndLaunchComponent} from "./components/finish-and-launch/finish-and-launch.component";
import {AppLauncherService} from "./services/app-launcher.service";

@NgModule({
  imports: [
    CommonModule,
    QuestionModule,
    PipesModule,
    IonicModule.forRoot(QuestionsPageComponent)
  ],
  declarations: [
    IntroductionComponent,
    QuestionsPageComponent,
    FinishComponent,
    FinishAndLaunchComponent,
    ToolbarComponent
  ],
  providers: [
    AnswerService,
    AudioRecordService,
    TimestampService,
    QuestionsService,
    FinishTaskService,
    AppLauncherService,
  ]
})
export class QuestionsModule {}
