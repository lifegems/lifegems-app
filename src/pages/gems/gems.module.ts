import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { GemsPage } from './gems';
import { InsightModule } from './insight/insight.module';

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
    InsightModule
  ],
  providers: []
})
export class GemsModule {}