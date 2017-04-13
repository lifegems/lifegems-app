import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class InsightService {
  constructor(private _http: Http, private storage: Storage) {}

  getArticles() {
    // return this._http.get("./data/it/it.json").map(response => response.json());
    return new Observable(observer => {
      this.storage.ready().then(() => {
        this.storage.get('insight').then(data => {
          observer.next(JSON.parse(data));
          observer.complete();
        });
      });
    });
  }


  getArticle(title) {
    let filepath = `./data/it/${title}.json`;
    return this._http.get(filepath).map(response => response.json());
  }


  getTags() {
    return new Observable(observer => {
      observer.next([
        {
          title: 'People',
          type: 'ARTICLE'
        },
        {
          title: 'Kings of Judah',
          type: 'ARTICLE'
        },
        {
          title: 'Places',
          type: 'ARTICLE'
        },
        {
          title: 'Prophecies',
          type: 'ARTICLE'
        }
      ]);
      observer.complete();
    });
  }
}