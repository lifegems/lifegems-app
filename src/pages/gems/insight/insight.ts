import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { InsightService } from '../../insight.service';
import { TagsService } from '../../tags.service';
import { ArticlePage } from './article';
import { TopicListPage } from './topic-list/topic-list';
import { TagListPage } from './tag-list';
import { TagsModal } from './modals';

import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight',
  templateUrl: 'insight.html'
})
export class InsightPage implements OnInit {
  allArticles: any;
  articles: any;
  unreadArticles: any;
  tags: any;
  sections: any[];

  constructor(public navCtrl: NavController, 
      public insightService: InsightService, 
      public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.insightService.getSections().subscribe(data => {
      this.sections = _.values(data);
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


