import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { InsightService } from '../insight.service';
import { Tag,TagsService } from '../tags.service';
import { TagListPage } from '../tag-list/tag-list';
import { ArticleTagsModal } from './article-tags.modal';

import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  articleData: any;
  tags: any;

  constructor(public navCtrl: NavController,
      private navParams: NavParams, 
      public insightService: InsightService, 
      private storage: Storage,
      private tagsService: TagsService, 
      public modalCtrl: ModalController) {
    this.article = this.navParams.get('article');
  }

  ngOnInit() {
    this.loadArticle();
    this.loadTags();
  }

  loadArticle() {
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
  }

  loadTags() {
    this.tagsService.getArticleTags(this.article.title).subscribe(tags => {
      this.tags = tags;
    });
  }

  viewTag(tag) {
    this.navCtrl.push(TagListPage, {
      tag: tag
    });
  }

  showTagList() {
    let modal = this.modalCtrl.create(ArticleTagsModal, { article: this.article });
    modal.onDidDismiss(() => this.loadTags());
    modal.present();
  }

  goBack() {
    this.navCtrl.pop();
  }
}