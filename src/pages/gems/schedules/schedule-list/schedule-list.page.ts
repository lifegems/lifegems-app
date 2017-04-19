import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BibleService } from '../../../bible.service';
import { BibleSchedulePage } from '../bible-schedule/bible-schedule.page';

@Component({
   selector: 'page-gems-schedules-schedule-list',
   templateUrl: 'schedule-list.html'
})
export class ScheduleListPage implements OnInit {
   constructor(public navCtrl: NavController, private bibleService: BibleService) {
      
   }

   ngOnInit() {}

   viewSchedule(pubType) {
      if (pubType === 'bible') {
         this.navCtrl.push(BibleSchedulePage);
      } else if (pubType === 'it') {

      }
   }
}