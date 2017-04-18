import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

import { InsightService } from '../../insight.service';
import { TagsService } from '../../tags.service';
import { ArticlePage } from './article/article';
import { TopicListPage } from './topic-list/topic-list';
import { TagListPage } from './tag-list/tag-list';

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

  articleTemplate: string;
  currentPageClass: any;
  displayType: string;
  showSearch: boolean;

  constructor(public navCtrl: NavController, 
      public insightService: InsightService, 
      public modalCtrl: ModalController) {
    this.currentPageClass = this;
    this.articleTemplate = `
    <ion-item *ngIf="item.type === 'ARTICLE'" ion-item (click)="currentPageClass.showArticle(item)">{{item.title}}</ion-item>
    `;
    this.displayType = 'articles';
    this.showSearch = false;
  }

  ngOnInit() {
    this.insightService.getSections().subscribe(data => {
      this.sections = _.values(data);
    });
  }

  showSection(section: any) {
    console.log("initiating topic list");
    this.navCtrl.push(TopicListPage, {
      topic: section
    });
  }

  showArticle(article: any) {
    this.navCtrl.push(ArticlePage, {
      article: article
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  showTags() {
    let modal = this.modalCtrl.create(TagsModal);
    modal.present();
  }
}


@Component({
   template: `
   <ion-header>
     <ion-toolbar>
       <ion-title>
         Tags
       </ion-title>
       <ion-buttons start>
         <button ion-button (click)="dismiss()">
           <span ion-text color="primary" showWhen="ios">Cancel</span>
         </button>
       </ion-buttons>
     </ion-toolbar>
   </ion-header>

   <ion-content>
     <ion-list>
      <button ion-item *ngFor="let tag of tags" (click)="showArticles(tag)">
        {{tag.name}}
      </button>
     </ion-list>
   </ion-content>
   `,
   selector: 'modal-tags'
})
export class TagsModal implements OnInit {
   tags: any;
   
   constructor(private tagsService: TagsService, public viewCtrl: ViewController, public navCtrl: NavController) {}
   
   ngOnInit() {
      console.log("tags");
      this.tagsService.getTags().subscribe(data => {
        this.tags = _.uniq(_.sortBy(_.map(data, tag => {
          let aTag = tag.split(".");
          let oTag = {
            name: aTag[0],
            article: aTag[1]
          }
          return oTag;
        }), tag => tag.name), tag => tag.name);
      });
   }
   
   dismiss() {
      this.viewCtrl.dismiss();
   }

   showArticles(tag) {
      this.navCtrl.push(TagListPage, {
        tag: tag
      });
   }
}