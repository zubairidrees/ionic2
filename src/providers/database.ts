import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { createConnection, Connection } from 'ionic-orm/dist'
import { Platform } from 'ionic-angular';
import {Bayaan} from "../entities/Bayaan";

/*
  Generated class for the Database provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class Database {

private _connection: Connection;

  constructor(platform: Platform) {
    console.log("Database contructor called!");
       platform.ready().then(() => {

        createConnection({
        driver: {
          type: "websql",
          database: "test"
        },
        entities: [
          Bayaan
        ],
        logging: {
          logFailedQueryError: true,
          logQueries: true,
          logSchemaCreation: true,
          logOnlyFailedQueries: true
        },
        autoSchemaSync: true,
      }).then(async connection => {
        this._connection = connection;
       });
     
    });
  }

  public get connection():Connection {
    return this._connection;
  }

  

}
