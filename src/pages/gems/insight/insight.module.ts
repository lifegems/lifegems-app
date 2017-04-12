import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InsightPage } from './insight';
import { ArticlePage } from './article/article';
import { InsightService } from './insight.service';

@NgModule({
  declarations: [
    InsightPage,
    ArticlePage
  ],
  exports: [],
  entryComponents: [
    InsightPage,
    ArticlePage
  ],
  imports: [
    IonicModule
  ],
  providers: [
    InsightService
  ]
})
export class InsightModule {}