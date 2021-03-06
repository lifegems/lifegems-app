import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InsightPage } from './insight';
import { ArticlePage } from './article';
import { ArticleTagsModal, TagsModal } from './modals';
import { TopicListPage } from './topic-list';
import { TagListPage } from './tag-list';

@NgModule({
  declarations: [
    InsightPage,
    ArticlePage,
    TopicListPage,
    TagListPage,
    TagsModal,
    ArticleTagsModal
  ],
  exports: [],
  entryComponents: [
    InsightPage,
    ArticlePage,
    TopicListPage,
    TagListPage,
    TagsModal,
    ArticleTagsModal
  ],
  imports: [
    IonicModule
  ],
  providers: []
})
export class InsightModule {}