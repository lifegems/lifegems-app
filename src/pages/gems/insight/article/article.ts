import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { InsightService } from '../insight.service';
import { Tag,TagsService } from '../tags.service';
import { TagListPage } from '../tag-list/tag-list';

import * as _ from 'underscore';

@Component({
  selector: 'page-gems-insight-article',
  templateUrl: 'article.html'
})
export class ArticlePage implements OnInit {
  article: any;
  articleData: any;
  isTagEntryShown: boolean;
  tags: any;
  tagname: string;

  constructor(public navCtrl: NavController,
      private navParams: NavParams, 
      public insightService: InsightService, 
      private storage: Storage,
      private tagsService: TagsService, 
      public modalCtrl: ModalController) {
    this.article = this.navParams.get('article');
    this.isTagEntryShown = false;
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

    this.tagsService.getArticleTags(this.article.title).subscribe(tags => {
      this.tags = tags;
    });
  }
  
  showTagEntry() {
    this.isTagEntryShown = !this.isTagEntryShown;
  }

  addTag() {
    let tag = new Tag();
    tag.name = this.tagname;
    tag.article = this.article.title;
    this.tags.push({
      name: tag.name,
      article: tag.article
    });
    this.tagsService.saveTag(tag);
    this.tagname = "";
    this.isTagEntryShown = false;
  }
  
  reset() {
   this.tagsService.resetTags();
  }

  viewTag(tag) {
    this.navCtrl.push(TagListPage, {
      tag: tag
    });
  }

  showTagList() {
    let modal = this.modalCtrl.create(ArticleTagsModal, { article: this.article });
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
       <ion-buttons end>
         <button ion-button (click)="saveTags()">
           <span ion-text color="primary" showWhen="ios">Done</span>
         </button>
       </ion-buttons>
     </ion-toolbar>
   </ion-header>

   <ion-content>
     <ion-list>
        <ion-item *ngFor="let tag of tags">
          <ion-label>{{tag.name}}</ion-label>
          <ion-checkbox color="primary" [(ngModel)]="tag.isSelected"></ion-checkbox>
        </ion-item>
        <ion-item>
          <ion-input [(ngModel)]="newTag" placeholder="tag name"></ion-input>
        </ion-item>
        <ion-item>
          <button ion-button (click)="createTag()">Add</button>
        </ion-item>
     </ion-list>
      
   </ion-content>
   `,
   selector: 'modal-article-tags'
})
export class ArticleTagsModal implements OnInit {
   article: any;
   newTag: any;
   tags: any;
   
   constructor(private tagsService: TagsService, 
    public viewCtrl: ViewController, 
    public navCtrl: NavController,
    public navParams: NavParams) {}
   
   ngOnInit() {
      this.article = this.navParams.get('article');
      this.tagsService.getTags().subscribe(data => {
        this.tags = _.uniq(_.sortBy(_.map(data, tag => {
          let aTag = tag.split(".");
          let oTag = {
            name: aTag[0],
            article: aTag[1],
            isSelected: (aTag[1] === this.article.title)
          }
          return oTag;
        }), tag => tag.name), tag => tag.name);
      });
   }

   createTag() {
      let tag = new Tag();
      tag.name = this.newTag;
      tag.article = this.article.title;
      this.tags.push({
        name: tag.name,
        article: tag.article
      });
      this.tagsService.saveTag(tag);
      this.newTag = "";
   }
   
   dismiss() {
      this.viewCtrl.dismiss();
   }

   saveTags() {
     console.log("saving tags");
     let saveTags = _.map(_.filter(this.tags, tag => tag.isSelected === true), tag => {
       let oTag = new Tag();
       oTag.name = tag.name;
       oTag.article = tag.article;
       return oTag;
     });
     this.tagsService.saveTags(saveTags);
     this.viewCtrl.dismiss();
   }

   showArticles(tag) {
      this.navCtrl.push(TagListPage, {
        tag: tag
      });
   }
}