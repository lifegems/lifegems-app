import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { InsightService } from '../insight.service';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  name: string;
  articleData: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, public insightService: InsightService, private storage: Storage) {
    this.article = this.navParams.get('article');
    this.name = this.article.name;
  }

  ngOnInit() {
    this.storage.ready().then(
      () => this.storage.get(`insight.articles.${this.name}`)
    ).then((data) => {
      if (!data) {
        this.insightService.getArticle(this.name).subscribe(data => {
          this.storage.set(`insight.articles.${this.name}`, JSON.stringify(data));
          this.articleData = data;
        });
      } else {
        this.articleData = data;
        this.articleData = JSON.parse(this.articleData);
      }
    });
  }
}
