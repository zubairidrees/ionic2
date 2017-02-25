import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {FirebaseService} from '../lib/fireBaseService'
import {Database} from '../providers/database'

@Component({
  templateUrl: 'app.html',
  providers:[FirebaseService,Database]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, database: Database) {
    console.log("app.componenet contructor called!");
    platform.ready().then(() => {

      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
