import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private _http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 100);      
      this.importMasterData();
      console.log("loading complete");
    });
  }

  importMasterData() {
    this.storage.ready().then(() => {
      this.storage.get('insight').then(data => {
        if (data) return;
        this._http.get("./data/it/it.json").map(response => response.json()).subscribe((data) => {
          console.log("loading data");
          this.storage.set('insight', JSON.stringify(data));
        });
      });
    });
  }
}
