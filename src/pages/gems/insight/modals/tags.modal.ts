import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import * as _ from 'underscore';

import { TagListPage } from '../tag-list';
import { TagsService } from '../../../tags.service';

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
        {{tag.name}} ({{tag.count}})
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
        this.tags = _.sortBy(_.map(data, tag => {
          let aTag = tag.split(".");
          let oTag = {
            name: aTag[0],
            article: aTag[1]
          }
          return oTag;
        }), tag => tag.name);
        this.tags = _.map(this.tags, data => {
          data.count = _.filter(this.tags, tag => data.name === tag.name).length;
          return data;
        });
        this.tags = _.uniq(this.tags, tag => tag.name);
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