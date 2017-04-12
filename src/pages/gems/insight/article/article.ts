import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InsightService } from '../insight.service';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  title: string;
  articleData: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, public insightService: InsightService) {
    this.article = this.navParams.get('article');
    this.title = this.article.title;
  }

  ngOnInit() {
    this.insightService.getArticle(this.title).subscribe(data => {
      this.articleData = data;
    });
  }
}
