import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Observable } from 'rxjs/Observable';
import * as _ from 'underscore';

@Injectable()
export class ReadProgressService {
   public constructor(private storage: Storage) {}

   public saveArticleReadStatus(articleName: string, status: boolean) {
      let save = `insight.article.${articleName}`;
      this.storage.ready().then(() => {
         this.storage.set(save, true);
      });
   }

   public getArticleReadStatus(articleName: string) {
      return new Observable(observer => {
         let save = `insight.article.${articleName}`;
         this.storage.ready().then(() => {
            this.storage.get(save).then(isRead => {
               observer.next(isRead);
               observer.complete();
            });
         });
      });
   }
}