import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InsightService } from '../../../insight.service';
import { ReadProgressService } from '../../../read-progress.service';
import { ArticlePage } from '../article';
import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight-topic-list',
  templateUrl: 'topic-list.html'
})
export class TopicListPage implements OnInit {
  topic: any;
  articles: any;
  allArticles: any[];
  searchterm: string;

  constructor(
    public navCtrl: NavController, 
    private navParams: NavParams, 
    private insightService: InsightService,
    private readProgressService: ReadProgressService) {
    this.topic = this.navParams.get('topic');
  } 

  ngOnInit() {
    this.readProgressService.getReadStatus('it').subscribe((readStatus: any) => {
      this.insightService.getArticles(this.topic.title).subscribe(data => {
        this.articles = _.map(data, article => {
          article.isRead = (_.indexOf(readStatus.complete, article.title) > -1);
          return article;
        });
        this.allArticles = this.articles;
      });
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

  loadReadStatus() {
    this.readProgressService.getReadStatus('it').subscribe((readStatus: any) => {
      this.articles = _.map(this.articles, article => {
        article.isRead = (_.indexOf(readStatus.complete, article.title) > -1);
        return article;
      });
    });
  }

  showArticle(article: any) {
    this.navCtrl.push(ArticlePage, {
      article: article
    });
  }

  ionViewDidEnter() {
    this.loadReadStatus();
  }
}