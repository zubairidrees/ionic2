import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable"
import { NavController, LoadingController } from 'ionic-angular/index';
import {Database} from "../providers/database";
import {Bayaan} from "../entities/Bayaan";
import {Connection } from 'ionic-orm/dist';
import {TypedJSON} from './typed-json';

declare var firebase;

@Injectable()
export class FirebaseService {

    connection: Connection;
    public that : FirebaseService;
    constructor(public loadingCtrl: LoadingController,private database: Database){
        this.connection = database.connection;
        this.that = this;
    }
   
    getHadees() {
    let loading = this.loadingCtrl.create({
        content: 'Please wait...'
    });

    loading.present();

    var ref = firebase.database().ref('/hadees');

        return new Observable(observer => {
            ref.once('value',
                (snapshot) => {
                    loading.dismiss();
                    var result = snapshot.val();
                    var arr = []
                    let bayanRepository = this.connection.getRepository(Bayaan);
                    result.forEach(function (data) {
                        var bayaan = TypedJSON.parse(data,Bayaan);
                        console.log((bayaan instanceof Bayaan)); // true
                        console.log(bayaan.title); // true
                        
                         bayanRepository.persist(bayaan);
                        arr.push(bayaan);
                    });
                    observer.next(arr)
                },
                (error) => {
                    console.log("ERROR:", error)
                    observer.error(error)
                });
            });
    }
}