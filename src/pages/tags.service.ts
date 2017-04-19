import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

import { Tag } from './gems/insight/tag-list';

@Injectable()
export class TagsService {
  constructor(private storage: Storage) {}

  getTags() {
    return new Observable(observer => {
      this.storage.get('tags').then(data => {
        observer.next(data.tags);
        observer.complete();
      });
    });
  }

  getArticleTags(articleName) {
    return new Observable(observer => {
      this.storage.get('tags').then(data => {
        let tags = _.map(data.tags, (tag) => {
          let aTag = tag.split(".");
          return {
             name: aTag[0],
             article: aTag[1]
          };
        });
        tags = _.filter(tags, (tag) => {
           return tag.article === articleName
        });
        observer.next(tags);
        observer.complete();
      });
    }); 
  }

  saveTags(tags: Tag[]) {
    this.storage.get('tags').then(data => {
      let oTags = (data && data.tags) ? data : {tags:[]};
      _.each(tags, tag => {
        if (_.indexOf(oTags.tags, tag.toString()) === -1) {
          oTags.tags.push(tag.toString());
        }
      });
      console.log("Saving.. ", oTags);
      this.storage.set('tags', oTags);
    });
  }

  saveTag(tag: Tag) {
    // this.saveTags([tag]);
  }

  deleteTags(tags: Tag[]) {
    this.storage.get('tags').then(data => {
      let oTags = data.tags;
      _.each(tags, tag => {
        if (_.indexOf(oTags, tag.toString()) > -1) {
          oTags = _.filter(oTags, item => (tag.toString() !== item));
        }
      });
      console.log("Deleting..", oTags);
      this.storage.set('tags', {tags:oTags});     
    });
  }

  deleteTag(tag: Tag) {
    // this.deleteTags([tag]);
  }

  updateArticleTags(newArticleTags: Tag[], article: string) {
    this.storage.get('tags').then(data => {
      let allTags = (data && data.tags) ? data : {tags:[]};
      let otherArticleTags = _.filter(allTags.tags, tag => {
        let aTag = tag.split("."); 
        return (aTag[1] !== article);
      });
      _.each(newArticleTags, tag => {
        otherArticleTags.push(tag.toString());
      });
      this.storage.set('tags', {tags: otherArticleTags});
    });
  }
   
  resetTags() {
     let tags = {tags: []};
     this.storage.set('tags', JSON.stringify(tags));
  }
}