import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InsightPage } from './insight/insight';
import { ScheduleListPage } from './schedules/schedule-list';

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

  viewSchedules() {
    this.navCtrl.push(ScheduleListPage);
  }

}
