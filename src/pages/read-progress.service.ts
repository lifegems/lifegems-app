import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

@Injectable()
export class ReadProgressService {
   readonly storagePathRoot: string = 'read-status';

   public constructor(private storage: Storage) {}

   /**
    * read-status.it = {
    *    "complete": [
    *       "reference",
    *       "reference",
    *       "reference",
    *       ...
    *    ]   
    * }
    */
   public saveReadStatus(book: string, reference: string, isRead: boolean) {
      let storagePath = `${this.storagePathRoot}.${book}`;
      this.storage.ready().then(() => {
         this.storage.get(storagePath).then(readStatus => {
            readStatus = (readStatus && readStatus.complete) ? readStatus : {complete:[]};
            let isMarked = (_.indexOf(readStatus.complete, reference) > -1);
            if (isRead && !isMarked) {
               // add item
               readStatus.complete.push(reference);
            } else if (!isRead && isMarked) {
               // remove item
               readStatus.complete = _.filter(readStatus.complete, ref => ref !== reference);
            }
            this.storage.set(storagePath, readStatus);
         });
      });
   }

   public getReadStatus(book: string) {
      return new Observable(observer => {
         let storagePath = `${this.storagePathRoot}.${book}`;
         this.storage.ready().then(() => {
            this.storage.get(storagePath).then(readStatus => {
               readStatus = (readStatus && readStatus.complete) ? readStatus : {complete:[]};
               observer.next(readStatus);
               observer.complete();
            });
         });
      });
   }

   public isArticleRead(book: string, reference: string) {
      return new Observable(observer => {
         let storagePath = `${this.storagePathRoot}.${book}`;
         this.storage.ready().then(() => {
            this.storage.get(storagePath).then(readStatus => {
               readStatus = (readStatus && readStatus.complete) ? readStatus : {complete:[]};
               let isRead = (_.indexOf(readStatus.complete, reference) > -1);
               observer.next(isRead);
               observer.complete();
            });
         });
      });
   }
}