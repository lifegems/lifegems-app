import { NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { TabsPage } from './tabs/tabs';
import { GemsModule } from './gems/gems.module';
import { HomePage } from './home/home';
import { SettingsPage } from './settings/settings';
import { InsightService } from './insight.service';
import { ReadProgressService } from './read-progress.service';
import { TagsService } from './tags.service';

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
  providers: [
    InsightService,
    ReadProgressService,
    TagsService
  ]
})
export class PagesModule {}