import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { InsightService } from '../insight.service';
import { Tag,TagsService } from '../tags.service';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  articleData: any;
  tags: any;
  tagname: string;

  constructor(public navCtrl: NavController,
    private navParams: NavParams, 
    public insightService: InsightService, 
    private storage: Storage,
    private tagsService: TagsService) {
    this.article = this.navParams.get('article');
  }

  ngOnInit() {
    this.storage.ready().then(
      () => this.storage.get(`insight.articles.${this.article.title}`)
    ).then((data) => {
      if (!data) {
        this.insightService.getArticle(this.article.title).subscribe(data => {
          this.storage.set(`insight.articles.${this.article.title}`, JSON.stringify(data));
          this.articleData = data;
        });
      } else {
        this.articleData = data;
        this.articleData = JSON.parse(this.articleData);
      }
    });

    this.tagsService.getArticleTags(this.article.title).subscribe(tags => this.tags);
  }

  addTag() {
    let tag = new Tag();
    tag.name = this.tagname;
    tag.article = this.article.title;
    this.tagsService.saveTag(tag);
  }
}
