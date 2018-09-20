import { Component, OnInit } from '@angular/core';
import { ChantiersService } from '../services/chantiers.service';
import { Chantier } from '../models/chantier.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-chantier-list',
  templateUrl: './chantier-list.component.html',
  styleUrls: ['./chantier-list.component.css']
})
export class ChantierListComponent implements OnInit {
  
  user: firebase.User;
  public chantiers: Observable<any[]>;
  public user_uid: String;
  public basePath: String;

  chantiersSubscription: Subscription;

  constructor(private chantiersService: ChantiersService, private router: Router) {}

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.user_uid = this.user.uid;
    this.basePath = '/chantiers/' + this.user_uid;
    this.chantiers = this.getChantiers(this.basePath);
  }

  getChantiers(path) {
    return this.chantiersService.getChantiers(path);
  }

  onNewChantier() {
    this.router.navigate(['/chantiers', 'new']);
  }

  onDeleteChantier(chantier: Chantier) {
    this.chantiersService.removeChantier(chantier);
  }

  onEditChantier(id: number) {
    this.router.navigate(['/chantiers', 'edit', id]);
  }

  onViewChantier(id: number) {
    this.router.navigate(['/chantiers', 'view', id]);
  }
  
}