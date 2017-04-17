import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Articles } from '../../../app/data/it/it';
import * as _ from 'underscore';
import 'rxjs/add/operator/map';

@Injectable()
export class InsightService {
  constructor(private _http: Http, private storage: Storage) {}

  getSections() {
    return new Observable(observer => {
      let sections = _.sortBy(_.values(Articles), item => item.title);
      let lastSection = _.find(sections, item => item.title === 'Supplement');
      sections = _.filter(sections, item => item.title !== 'Supplement');
      sections.push(lastSection);
      observer.next(sections);
      observer.complete();
    });
  }


  getArticle(title) {
    let filepath = `./data/it/${title}.json`;
    return this._http.get(filepath).map(response => response.json());
  }

  getArticles(section) {
    return new Observable(observer => {
      let articles = _.sortBy(_.values(Articles[section].articles), item => item.title);
      observer.next(articles);
      observer.complete();
    });
  }
}