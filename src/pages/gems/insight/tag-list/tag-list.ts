import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InsightService } from '../../../insight.service';
import { TagsService } from '../../../tags.service';
import { ReadProgressService } from '../../../read-progress.service';
import { ArticlePage } from '../article';
import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight-topic-list',
  templateUrl: 'tag-list.html'
})
export class TagListPage implements OnInit {
  tag: any;
  tags: any;

  constructor(public navCtrl: NavController, 
    private navParams: NavParams, 
    private insightService: InsightService,
    private tagsService: TagsService,
    private readProgressService: ReadProgressService) {
    this.tag = this.navParams.get('tag');
  } 

  ngOnInit() {
    this.readProgressService.getReadStatus('it').subscribe((readStatus: any) => {
      this.tagsService.getTags().subscribe(tags => {
        this.tags = _.sortBy(_.filter(_.map(tags, tag => {
          let aTag = tag.split(".");
          return {
            name: aTag[0],
            article: {
              title: aTag[1],
              isRead: (_.indexOf(readStatus.complete, aTag[1]) > -1)
            }
          };
        }), tag => {
          return (tag.name === this.tag.name);
        }), tag => tag.article.title);
      });
    });
  }

  loadReadStatus() {
    this.readProgressService.getReadStatus('it').subscribe((readStatus: any) => {
      this.tags = _.map(this.tags, tag => {
        tag.article.isRead = (_.indexOf(readStatus.complete, tag.article.title) > -1);
        return tag;
      });
    });
  }

  showArticle(article) {
    this.navCtrl.push(ArticlePage, {
      article: article
    })
  }

  ionViewDidEnter() {
    this.loadReadStatus();
  }
}