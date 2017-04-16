import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public storage: Storage) {

  }

  resetTags() {
     let tags = {tags: []};
     this.storage.set('tags', tags);
  }

}
