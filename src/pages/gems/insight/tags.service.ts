import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

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
        console.log(tags);
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
      let oTags = (data) ? data : {tags:[]};
      oTags.tags.push(tag.toString());
      this.storage.set('tags', oTags);
    });
  }
   
  resetTags() {
     let tags = {tags: []};
     this.storage.set('tags', JSON.stringify(tags));
  }
}

export class Tag {
  public name: string;
  public article: string;

  public toString() {
     return `${this.name}.${this.article}`;
  }
}