import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InsightService } from '../../../insight.service';
import { ArticlePage } from '../article';
import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight-topic-list',
  templateUrl: 'topic-list.html'
})
export class TopicListPage implements OnInit {
  topic: any;
  callback: any;
  articles: any;
  allArticles: any[];

  constructor(public navCtrl: NavController, private navParams: NavParams, private insightService: InsightService) {
    this.topic = this.navParams.get('topic');
  } 

  ngOnInit() {
    this.insightService.getArticles(this.topic.title).subscribe(data => {
      this.articles = data;
      this.allArticles = this.articles;
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