import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Chantier } from '../models/chantier.model';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ChantiersService {

  constructor(private firebase :AngularFireDatabase ) { };
 
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

  getSingleChantier(path): Observable<any> {
    return this.firebase.object(path).valueChanges();
  }

  removeChantier(chantier: Chantier) {

  }

}
