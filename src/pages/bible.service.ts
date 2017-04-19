import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as _ from 'underscore';

import { Bible } from '../app/data/bible/bible';

@Injectable()
export class BibleService {
   constructor() { }

   getBible() {
      return new Observable(observer => {
         observer.next(Bible);
         observer.complete();
      });
   }
}