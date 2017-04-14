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
        observer.next(JSON.parse(data));
        observer.complete();
      });
    });
  }

  getArticleTags(articleName) {
    return new Observable(observer => {
      this.storage.set('tags', []);
      this.storage.get('tags').then(data => {
        let tags = _.filter(JSON.parse(data), (tag) => {
          return tag.article === articleName;
        });
        observer.next(tags);
        observer.complete();
      });
    }); 
  }

  saveTag(tag: Tag) {
    this.storage.get('tags').then(data => {
      let tags = (data) ? JSON.parse(data) : [];
      tags.push(tag);
      this.storage.set('tags', JSON.stringify(tags));
    });
  }
}

export class Tag {
  public name: string;
  public article: string;
}