import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InsightPage, TagsModal } from './insight';
import { ArticlePage } from './article/article';
import { ArticleTagsModal } from './article/article-tags.modal';
import { TopicListPage } from './topic-list/topic-list';
import { TagListPage } from './tag-list/tag-list';

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