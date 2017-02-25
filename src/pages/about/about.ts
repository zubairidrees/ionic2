import { Component } from '@angular/core';

import { NavController, Platform, AlertController } from 'ionic-angular';
import { FirebaseService } from '../../lib/fireBaseService'
import { MediaPlugin } from 'ionic-native';
import { File, Transfer } from 'ionic-native';
import {Database} from "../../providers/database";
import {Bayaan} from "../../entities/Bayaan";
import {Connection } from 'ionic-orm/dist';
import {TypedJSON, JsonObject, JsonMember} from '../../lib/typed-json';
declare var cordova: any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  connection: Connection;
  fbService: FirebaseService;
  file;
  items;
  storageDirectory: string = '';

  constructor(public navCtrl: NavController, public platform: Platform, fbService: FirebaseService, public alertCtrl: AlertController,private database: Database) {
    console.log('constructor');
   this.connection = database.connection;

    this.fbService = fbService;

    this.loadData();

    this.platform.ready().then(() => {
      // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
      if (!this.platform.is('cordova')) {
        return false;
      }

      if (this.platform.is('ios')) {
        this.storageDirectory = cordova.file.documentsDirectory;
      }
      else if (this.platform.is('android')) {
        this.storageDirectory = cordova.file.dataDirectory;
      }
      else {
        // exit otherwise, but you could add further types here e.g. Windows
        return false;
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad');

  }

  loadData() {

    this.items = this.fbService.getHadees();
   
    // this.items = [{title:"Audio 1",URL:'http://www.darsequran.com//images/multimedia/audio/hamdnaat/jjbadr/badrudduja.mp3'},
    // {title:"Audio 1",URL:'http://www.darsequran.com//images/multimedia/audio/hamdnaat/jjbadr/badrudduja.mp3'}]

  }

  audioplay(path) {
    path = 'http://www.darsequran.com//images/multimedia/audio/hamdnaat/jjbadr/badrudduja.mp3';
    this.file = new MediaPlugin(path, (status) => {
      console.log(status);
    });

    this.file.play();
  }


  playaudio() {
    this.file.play();
  }

  audiostop() {
    this.file.stop();
  }

  audiopause() {
    this.file.pause();
  }

  downloadFile(url) {
    url = 'http://www.darsequran.com//images/multimedia/audio/hamdnaat/jjbadr/badrudduja.mp3';
   // const fileTransfer = new Transfer();



    // fileTransfer.download(url, cordova.file.externalRootDirectory + 'cutePuppyPics' + 'filename.mp3').then((entry) => {
    //   const alertSuccess = this.alertCtrl.create({
    //     title: `Download Succeeded!`,
    //     subTitle: ` was successfully downloaded to: ${entry.toURL()}`,
    //     buttons: ['Ok']

    //   });
    //   alertSuccess.present();
    //   // console.log('download complete: ' + entry.toURL());
    // }, (error) => {
    //   const alertFailure = this.alertCtrl.create({
    //     title: `Download Failed!`,
    //     subTitle: ` was not successfully downloaded. Error code: ${error.code}`,
    //     buttons: ['Ok']
    //   });
        
    //   alertFailure.present();
    // });

        this.platform.ready().then(() => {

     const fileTransfer = new Transfer();
    
console.log('storageDirectory = '+cordova.file.externalDataDirectory); 
           fileTransfer.download(url, cordova.file.externalDataDirectory + '/test.mp3').then((entry) => {
             
             const alertSuccess = this.alertCtrl.create({
              title: `Download Succeeded!`,
               subTitle: ` was successfully downloaded to: ${entry.toURL()}`,
               buttons: ['Ok']
             });

             alertSuccess.present();

           }, (error) => {

             const alertFailure = this.alertCtrl.create({
               title: `Download Failed!`,
               subTitle: ` was not successfully downloaded. Error code: ${error.code}`,
               buttons: ['Ok']
             });

             alertFailure.present();

           });

     });
  }



}
