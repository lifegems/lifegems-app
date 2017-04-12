import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { TabsPage } from './tabs/tabs';
import { GemsModule } from './gems/gems.module';
import { HomePage } from './home/home';
import { SettingsPage } from './settings/settings';

@NgModule({
  declarations: [
    HomePage,
    SettingsPage,
    TabsPage
  ],
  exports: [],
  entryComponents: [
    HomePage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    IonicModule,
    GemsModule
  ],
  providers: []
})
export class PagesModule {}