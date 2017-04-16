import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { InsightService } from '../insight.service';
import { Tag,TagsService } from '../tags.service';
import { TagListPage } from '../tag-list/tag-list';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  articleData: any;
  isTagEntryShown: boolean;
  tags: any;
  tagname: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams, 
    public insightService: InsightService, 
    private storage: Storage,
    private tagsService: TagsService) {
    this.article = this.navParams.get('article');
    this.isTagEntryShown = false;
  }

  ngOnInit() {
    this.storage.ready().then(
      () => this.storage.get(`insight.articles.${this.article.title}`)
    ).then((data) => {
      if (!data) {
        this.insightService.getArticle(this.article.title).subscribe(data => {
          this.storage.set(`insight.articles.${this.article.title}`, JSON.stringify(data));
          this.articleData = data;
        });
      } else {
        this.articleData = data;
        this.articleData = JSON.parse(this.articleData);
      }
    });

    this.tagsService.getArticleTags(this.article.title).subscribe(tags => {
      this.tags = tags;
    });
  }
  
  showTagEntry() {
    this.isTagEntryShown = !this.isTagEntryShown;
  }

  addTag() {
    let tag = new Tag();
    tag.name = this.tagname;
    tag.article = this.article.title;
    this.tags.push({
      name: tag.name,
      article: tag.article
    });
    this.tagsService.saveTag(tag);
    this.tagname = "";
    this.isTagEntryShown = false;
  }
  
  reset() {
   this.tagsService.resetTags();
  }

  viewTag(tag) {
    this.navCtrl.push(TagListPage, {
      tag: tag
    });
  }
}
