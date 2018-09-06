import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
	  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyB0IMheWsaKO0u8ea5wv7sxHRTy4K6750Q",
	    authDomain: "corabapp.firebaseapp.com",
	    databaseURL: "https://corabapp.firebaseio.com",
	    projectId: "corabapp",
	    storageBucket: "corabapp.appspot.com",
	    messagingSenderId: "233633627533"
	  };
	  firebase.initializeApp(config);
  }
}
