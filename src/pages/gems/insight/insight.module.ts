import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { IonAlphaScrollModule } from 'ionic2-alpha-scroll';

import { InsightPage } from './insight';
import { ArticlePage } from './article/article';
import { InsightService } from './insight.service';
import { TopicListPage } from './topic-list/topic-list';

@NgModule({
  declarations: [
    InsightPage,
    ArticlePage,
    TopicListPage
  ],
  exports: [],
  entryComponents: [
    InsightPage,
    ArticlePage,
    TopicListPage
  ],
  imports: [
    IonicModule,
    // IonAlphaScrollModule
  ],
  providers: [
    InsightService
  ]
})
export class InsightModule {}