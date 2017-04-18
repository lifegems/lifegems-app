import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { InsightService } from '../../../insight.service';
import { TagsService } from '../../../tags.service';
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
    private tagsService: TagsService) {
    this.tag = this.navParams.get('tag');
  } 

  ngOnInit() {
    this.tagsService.getTags().subscribe(tags => {
      this.tags = _.sortBy(_.filter(_.map(tags, tag => {
        let aTag = tag.split(".");
        return {
          name: aTag[0],
          article: aTag[1]
        };
      }), tag => {
        return (tag.name === this.tag.name);
      }), tag => tag.article);
    });
  }

  showArticle(article) {
    this.navCtrl.push(ArticlePage, {
      article: {
        title: article
      }
    })
  }
}