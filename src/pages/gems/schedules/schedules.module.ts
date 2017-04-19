import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { ScheduleListPage } from './schedule-list/schedule-list.page';
import { BibleSchedulePage } from './bible-schedule/bible-schedule.page';

@NgModule({
  declarations: [
     BibleSchedulePage,
     ScheduleListPage
  ],
  exports: [],
  entryComponents: [
     BibleSchedulePage,
     ScheduleListPage
  ],
  imports: [
    IonicModule
  ],
  providers: []
})
export class SchedulesModule {}