import { Component, OnInit } from '@angular/core';
import { Chantier } from '../../models/chantier.model';
import { BingRoute } from '../../models/bingRoute.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChantiersService } from '../../services/chantiers.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

declare const google: any;

@Component({
  selector: 'app-single-chantier',
  templateUrl: './single-chantier.component.html',
  styleUrls: ['./single-chantier.component.css']
})
export class SingleChantierComponent implements OnInit {
  
  lieuxForm: FormGroup;
  user: firebase.User;
  public user_uid: String;
  public chantierObs: Observable<any>;
  public editAdresse: Boolean;
  public bingRoute: BingRoute;
  public distance: number;
  public fullAdresse: string;
  error: any;

  constructor(private route: ActivatedRoute, private chantiersService: ChantiersService,
              private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.user_uid = this.user.uid;    
    const path = '/chantiers/' + this.user_uid + '/' + this.route.snapshot.params['id'];
    console.log(path);
    this.chantierObs = this.getSingleChantier(path);
    this.editAdresse = false;
    this.lieuxForm = this.formBuilder.group({
      ville: '',
      adresse: ''
    });
  }

  getSingleChantier(path) {    
    return this.chantiersService.getSingleChantier(path);
  }

  onEditChantierItem(itemName) {    
    console.log(itemName);
    if (itemName == 'editAdresse') { this.editAdresse = true};
  }

  updateChantierItem(itemName, itemValue) {   
    console.log(itemName + ': ' + itemValue);
    const path = '/chantiers/' + this.user_uid + '/' + this.route.snapshot.params['id']; 
    this.chantiersService.updateChantierItem(path, itemName, itemValue);
  }

  async calculateBingRoute(adresse, ville) {
    this.fullAdresse = adresse + ' ' + ville;
    await this.chantiersService.getBingRoute(this.fullAdresse).then(
      (data: BingRoute) => this.bingRoute = { ...data }, // success path
      error => this.error = error // error path
    );

    if(this.error) { 
      console.log(this.error) ;
      this.updateChantierItem('distance', 'Non disponible');
    } else {
      this.distance = Math.round(this.bingRoute.resourceSets['0']['resources']['0']['travelDistance']);
      this.updateChantierItem('distance', this.distance);      
    }
    this.error = undefined;
  }

  onBack() {
    this.router.navigate(['/chantiers']);
  }
}