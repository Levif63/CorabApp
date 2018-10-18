import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Chantier } from '../models/chantier.model';
import { BingRoute } from '../models/bingRoute.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ChantiersService {

  constructor(private firebase :AngularFireDatabase, protected http: HttpClient) { };
 
  createNewChantier(basePath, newChantier) {
    const obj = this.firebase.database.ref(basePath);
    obj.push(newChantier);
  }

  getChantiers(path): Observable<any[]> {

    // Use snapshotChanges().map() to store the key
    return this.firebase.list(path).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  getSingleChantier(path: any): Observable<any> {
    return this.firebase.object(path).valueChanges();
  }

  updateChantierItem(path: any, item: any, value: String) {
    const itemRef = this.firebase.object(path);
    console.log(path);
    itemRef.update({ [item]: value});
  }

  removeChantier(chantier: Chantier) {

  }

  getBingRoute(url: string) {
    return this.http.get(url);
  }

}
