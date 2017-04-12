import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InsightPage } from './insight/insight';

@Component({
  selector: 'page-gems',
  templateUrl: 'gems.html'
})
export class GemsPage {

  constructor(public navCtrl: NavController) {

  }

  viewInsight() {
    this.navCtrl.push(InsightPage);
  }

}
