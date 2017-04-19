import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { GemsPage } from './gems';
import { InsightModule } from './insight';
import { SchedulesModule } from './schedules';


@NgModule({
  declarations: [
    GemsPage
  ],
  exports: [],
  entryComponents: [
    GemsPage
  ],
  imports: [
    IonicModule,
    InsightModule,
    SchedulesModule
  ],
  providers: []
})
export class GemsModule {}