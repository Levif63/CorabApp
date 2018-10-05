import { Component, OnInit } from '@angular/core';
import { Chantier } from '../../models/chantier.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChantiersService } from '../../services/chantiers.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-single-chantier',
  templateUrl: './single-chantier.component.html',
  styleUrls: ['./single-chantier.component.css']
})
export class SingleChantierComponent implements OnInit {
  
  user: firebase.User;
  public user_uid: String;
  public chantierObs: Observable<any>;
  public editSynopsis: Boolean;

  constructor(private route: ActivatedRoute, private chantiersService: ChantiersService,
              private router: Router) {}

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.user_uid = this.user.uid;    
    const path = '/chantiers/' + this.user_uid + '/' + this.route.snapshot.params['id'];
    console.log(path);
    this.chantierObs = this.getSingleChantier(path);
    this.editSynopsis = false;
  }

  getSingleChantier(path) {    
    return this.chantiersService.getSingleChantier(path);
  }

  onEditChantierItem(itemName) {    
    console.log(itemName);
    if (itemName == 'editSynopsis') { this.editSynopsis = true};
  }

  updateChantierItem(itemName, itemValue) {   
    console.log(itemName + ': ' + itemValue);
    const path = '/chantiers/' + this.user_uid + '/' + this.route.snapshot.params['id']; 
    this.chantiersService.updateChantierItem(path, itemName, itemValue);
  }

  onBack() {
    this.router.navigate(['/chantiers']);
  }
}