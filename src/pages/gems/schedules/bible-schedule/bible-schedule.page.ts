import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BibleService } from '../../../bible.service';

@Component({
   selector: 'page-gems-schedules-bible-schedule',
   templateUrl: 'bible-schedule.html'
})
export class BibleSchedulePage implements OnInit {
   public scheduleView: string;
   public Bible: any;

   constructor(public navCtrl: NavController, private bibleService: BibleService) {
      this.scheduleView = 'schedules';
      this.bibleService.getBible().subscribe(Bible => {
         this.Bible = Bible;
      });
   }

   ngOnInit() {}
}