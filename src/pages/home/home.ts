import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as _ from 'underscore';

import { TagsService } from '../tags.service';
import { InsightService } from '../insight.service';
import { Tag, ArticlePage } from '../gems';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  public tags: Tag[];
  public articlesCount: number = 0;
  public randomArticle: any;

  constructor(
    public navCtrl: NavController, 
    private tagsService: TagsService,
    private insightService: InsightService) {
  }

  ngOnInit() {
    this.tagsService.getTags().subscribe(tags => {
      this.tags = _.map(tags, tag => {
        let aTag = tag.split(".");
        return new Tag(aTag[0], aTag[1]);
      })
    });
    this.getArticlesCount();
    this.loadRandomArticle();
  }

  getTaggedArticlesCount() {
    return _.uniq(_.pluck(this.tags, 'article')).length || null;
  }

  getTagCount() {
    return _.uniq(_.pluck(this.tags, 'name')).length || null;
  }

  getArticlesCount() {
    this.insightService.getSections().subscribe(sections => {
      _.each(sections, section => {
        this.articlesCount += _.values(section.articles).length;
      })
    });
  }

  loadRandomArticle() {
    this.insightService.getSections().subscribe(sections => {
      let maxSectionIndex: number = _.values(sections).length - 1;
      let randomSection: any = sections[_.random(maxSectionIndex)];
      let articles: any[] = _.values(randomSection.articles);
      let maxArticleIndex: number = articles.length - 1;
      this.randomArticle = articles[maxArticleIndex];
    });
  }

  viewArticle(article) {
    this.navCtrl.push(ArticlePage, {
      article: article
    })
  }

}
