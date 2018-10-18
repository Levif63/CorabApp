import { Component, OnInit } from '@angular/core';
import { Chantier } from '../../models/chantier.model';
import { BingRoute } from '../../models/bingRoute.model';
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
  
  user: firebase.User;
  public user_uid: String;
  public chantierObs: Observable<any>;
  public editAdresse: Boolean;
  public bingRoute: BingRoute;

  constructor(private route: ActivatedRoute, private chantiersService: ChantiersService,
              private router: Router) {}

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.user_uid = this.user.uid;    
    const path = '/chantiers/' + this.user_uid + '/' + this.route.snapshot.params['id'];
    console.log(path);
    this.chantierObs = this.getSingleChantier(path);
    this.editAdresse = false;
    const nyc = new google.maps.LatLng(40.715, -74.002);
    const london = new google.maps.LatLng(51.506, -0.119);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(nyc, london) / 1000;

    this.chantiersService.getBingRoute('http://dev.virtualearth.net/REST/V1/Routes/Driving?wp.0=Joze,MN&wp.1=06000%20Nice,MN&routeAttributes=excludeItinerary&key=AiHTHK6q2pPwIVATMZUVphUB5UZVtS6a0wXR-4JrZJxXEaT19PX12EicfDxHD7kJ')
    .subscribe((data: BingRoute) => this.bingRoute = { ...data });

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
    switch(itemName){
    case "adresse":{this.editAdresse = false;}
    
    }
    
  }

  onBack() {
    this.router.navigate(['/chantiers']);
  }
}