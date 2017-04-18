import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController, AlertController } from 'ionic-angular';

import { TagListPage } from '../tag-list/tag-list';
import { TagsService, Tag } from '../tags.service';

import * as _ from 'underscore';

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
         <button ion-button (click)="updateTags()">
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
     </ion-list>
   </ion-content>

   <ion-footer>
      <ion-toolbar>
         <ion-buttons end>
            <button ion-button (click)="newTagAlert()">
               <span ion-text color="primary" showWhen="ios">Create Tag</span>
            </button>
         </ion-buttons>
      </ion-toolbar>
   </ion-footer>
   `,
   selector: 'modal-article-tags'
})
export class ArticleTagsModal implements OnInit {
   article: any;
   tags: any;
   
   constructor(private tagsService: TagsService, 
    public viewCtrl: ViewController, 
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {}
   
   ngOnInit() {
      this.article = this.navParams.get('article');
      this.tagsService.getTags().subscribe(data => {
         let tags = _.map(data, tag => {
            let aTag = tag.split(".");
            return {
               name: aTag[0],
               article: aTag[1]
            }
         });
         let allTags = _.uniq(_.pluck(tags, 'name'));
         let articleTags = _.pluck(_.filter(tags, tag => {
            return tag.article === this.article.title;
         }), 'name');
         this.tags = _.map(allTags, tag => {
            return {
               name: tag,
               article: this.article.title,
               isSelected: (_.indexOf(articleTags, tag) > -1) 
            };
         });
      });
   }

   createTag(tagName) {
      let tag = new Tag(tagName, this.article.title);
      this.tags.push({
        name: tag.name,
        article: tag.article,
        isSelected: true
      });
      this.tagsService.saveTag(tag);
   }
   
   dismiss() {
      this.viewCtrl.dismiss();
   }

   newTagAlert() {
      let tagAlert = this.alertCtrl.create({
         title: 'Create New Tag',
         message: "Enter a name for this new tag",
         inputs: [
            { name: 'name', placeholder: 'Tag Name' }
         ],
         buttons: [
            { text: 'Cancel', handler: data => {
               tagAlert.dismiss();
            }},
            { text: 'Save', handler: data => {
               this.createTag(data.name);
               tagAlert.dismiss();
            }}
         ]
      });
      tagAlert.present();
   }

   updateTags() {
     let saveTags = _.map(_.filter(this.tags, tag => tag.isSelected === true), tag => {
       let oTag = new Tag(tag.name, tag.article);
       return oTag;
     });
     let deleteTags = _.map(_.filter(this.tags, tag => tag.isSelected === false), tag => {
       let oTag = new Tag(tag.name, tag.article);
       return oTag;
     });
     this.tagsService.saveTags(saveTags);
     this.tagsService.deleteTags(deleteTags);
     this.viewCtrl.dismiss();
   }

   showArticles(tag) {
      this.navCtrl.push(TagListPage, {
        tag: tag
      });
   }
}