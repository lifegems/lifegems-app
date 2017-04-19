import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TagsService } from '../tags.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public tagsService: TagsService) {

  }

  resetTags() {
    let isDelete = confirm("Are you sure you want to delete all tags? This can not be reversed.");
    if (isDelete) {
      this.tagsService.resetTags();
    }
  }

}
