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
  public chantier: Observable<any>;

  constructor(private route: ActivatedRoute, private chantiersService: ChantiersService,
              private router: Router) {}

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.user_uid = this.user.uid;    
    const path = '/chantiers/' + this.user_uid + '/' + this.route.snapshot.params['id'];
    console.log(path);
    this.chantier = this.getSingleChantier(path);
  }

  getSingleChantier(path) {    
    return this.chantiersService.getSingleChantier(path);
  }

  onBack() {
    this.router.navigate(['/chantiers']);
  }
}