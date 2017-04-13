import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InsightService } from '../insight.service';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  name: string;
  articleData: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, public insightService: InsightService) {
    this.article = this.navParams.get('article');
    this.name = this.article.name;
  }

  ngOnInit() {
    this.insightService.getArticle(this.name).subscribe(data => {
      this.articleData = data;
    });
  }
}
