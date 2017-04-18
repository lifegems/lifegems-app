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
    _.each(tags, tag => {
      this.saveTag(tag);
    });
  }

  saveTag(tag: Tag) {
    this.storage.get('tags').then(data => {
      let oTags = (data && data.tags) ? data : {tags:[]};
      if (_.indexOf(oTags.tags, tag.toString()) === -1) {
        oTags.tags.push(tag.toString());
        this.storage.set('tags', oTags);
      }
    });
  }

  deleteTags(tags: Tag[]) {
    _.each(tags, tag => {
      this.deleteTag(tag);
    });
  }

  deleteTag(tag: Tag) {
    this.storage.get('tags').then(data => {
      if (_.indexOf(data.tags, tag.toString()) > -1) {
        let oTags = _.filter(data.tags, item => (tag.toString() !== item));
        this.storage.set('tags', {tags:oTags});
      }
    });
  }
   
  resetTags() {
     let tags = {tags: []};
     this.storage.set('tags', JSON.stringify(tags));
  }
}