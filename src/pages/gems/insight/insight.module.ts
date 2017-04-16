import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
// import { IonAlphaScrollModule } from 'ionic2-alpha-scroll';

import { InsightPage, TagsModal } from './insight';
import { ArticlePage } from './article/article';
import { InsightService } from './insight.service';
import { TagsService } from './tags.service';
import { TopicListPage } from './topic-list/topic-list';
import { TagListPage } from './tag-list/tag-list';

@NgModule({
  declarations: [
    InsightPage,
    ArticlePage,
    TopicListPage,
    TagListPage,
    TagsModal
  ],
  exports: [],
  entryComponents: [
    InsightPage,
    ArticlePage,
    TopicListPage,
    TagListPage,
    TagsModal
  ],
  imports: [
    IonicModule,
    // IonAlphaScrollModule
  ],
  providers: [
    InsightService,
    TagsService
  ]
})
export class InsightModule {}