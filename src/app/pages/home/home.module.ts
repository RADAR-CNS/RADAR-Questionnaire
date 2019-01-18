import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular'

import { PipesModule } from '../../shared/pipes/pipes.module'
import { TaskCalendarModule } from './components/task-calendar/task-calendar.module'
import { TaskInfoModule } from './components/task-info/task-info.module'
import { TaskProgressModule } from './components/task-progress/task-progress.module'
import { TickerBarModule } from './components/ticker-bar/ticker-bar.module'
import { HomePageComponent } from './containers/home-page.component'
import { TasksService } from './services/tasks.service'
import {TaskListModule} from "./components/task-list/task-list.module";
import {FooterNavbarModule} from "../footer-navbar/footer-navbar.module";

@NgModule({
  imports: [
    CommonModule,
    TaskCalendarModule,
    TaskInfoModule,
    TaskProgressModule,
    TickerBarModule,
    TaskListModule,
    PipesModule,
    FooterNavbarModule,
    IonicModule.forRoot(HomePageComponent)
  ],
  declarations: [HomePageComponent],
  providers: [TasksService]
})
export class HomeModule {}
