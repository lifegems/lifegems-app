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