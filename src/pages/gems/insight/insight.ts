import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { InsightService } from '../../insight.service';
import { TagsService } from '../../tags.service';
import { ReadProgressService } from '../../read-progress.service';
import { ArticlePage } from './article';
import { TopicListPage } from './topic-list';
import { TagsModal } from './modals';

import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight',
  templateUrl: 'insight.html'
})
export class InsightPage implements OnInit {
  allArticles: any;
  articles: any;
  articlesView: string;
  readArticles: any;
  tags: any;
  sections: any[];

  constructor(public navCtrl: NavController, 
      public insightService: InsightService,
      public readProgressService: ReadProgressService,
      public modalCtrl: ModalController) {
      this.articlesView = 'alpha';
  }

  ngOnInit() {
    this.insightService.getSections().subscribe(data => {
      this.sections = _.map(_.values(data), section => {
        section.count = _.values(section.articles).length;
        return section;
      });
    });
    this.readProgressService.getReadStatus('it').subscribe((readStatus: any) => {
      this.readArticles = _.sortBy(_.map(readStatus.complete, (reference: string) => {
        return {
          title: reference
        };
      }), article => article.title);
    });
  }

  showSection(section: any) {
    this.navCtrl.push(TopicListPage, {
      topic: section
    });
  }

  showArticle(article: any) {
    this.navCtrl.push(ArticlePage, {
      article: article
    });
  }

  showTags() {
    let modal = this.modalCtrl.create(TagsModal);
    modal.present();
  }
}


