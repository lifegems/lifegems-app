import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InsightService } from './insight.service';
import { ArticlePage } from './article/article';

import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight',
  templateUrl: 'insight.html'
})
export class InsightPage implements OnInit {
  allArticles: any;
  articles: any;
  articleTemplate: string;
  currentPageClass: any;

  constructor(public navCtrl: NavController, public insightService: InsightService) {
    this.currentPageClass = this;
    this.articleTemplate = `
    <button *ngIf="item.type === 'ARTICLE'" ion-item (click)="currentPageClass.showArticle(item)">{{item.title}}</button>
    `;
  }

  ngOnInit() {
    this.insightService.getArticles().subscribe(data => {
      let aData = _.sortBy(data, item => item.title);

      let sections = [];
      _.each(_.values(aData), (section) => {
        sections.push({
          title: section.title,
          type: 'SECTION'
        });
        _.each(_.values(section.articles), (article) => {
          sections.push({
            title: article.title.replace("ʽ","").replace("ʼ",""),
            name: article.title,
            type: 'ARTICLE'
          });
        });
      });
      this.allArticles = sections;
      this.articles = this.allArticles;
    });
  }

  filterItems(ev: any) {
    this.articles = this.allArticles;

    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.articles = this.articles.filter(item => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1) || (item.type === 'SECTION');
      });
    }
  }

  showArticle(article: any) {
    this.navCtrl.push(ArticlePage, {
      article: article
    });
  }
}
