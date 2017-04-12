import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class InsightService {
  constructor(private _http: Http) {}

  getArticles() {
    return this._http.get("./data/it/it.json").map(response => response.json());
  }


  getArticle(title) {
    let filepath = `./data/it/${title}.json`;
    return this._http.get(filepath).map(response => response.json());
  }
}