import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { InsightService } from '../../../insight.service';
import { TagsService } from '../../../tags.service';
import { TagListPage } from '../tag-list/tag-list';
import { Tag } from '../tag-list/tag.model';
import { ArticleTagsModal } from './';

import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  articleData: any;
  tags: any;
  isRead: boolean;

  constructor(public navCtrl: NavController,
      private navParams: NavParams, 
      public insightService: InsightService, 
      private storage: Storage,
      private tagsService: TagsService, 
      public modalCtrl: ModalController,
      private toastCtrl: ToastController) {
    this.article = this.navParams.get('article');
    this.isRead = false;
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

  markAsRead() {
    this.isRead = !this.isRead;
    let toast = this.toastCtrl.create({
      message: (this.isRead) ? "Marked as read" : "Marked as unread",
      duration: 1000,
      position: 'middle'
    });
    toast.present();
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