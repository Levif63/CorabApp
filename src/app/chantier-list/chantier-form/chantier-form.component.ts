import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chantier } from '../../models/chantier.model';
import { ChantiersService } from '../../services/chantiers.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-chantier-form',
  templateUrl: './chantier-form.component.html',
  styleUrls: ['./chantier-form.component.css']
})
export class ChantierFormComponent implements OnInit {

  chantierForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private chantiersService: ChantiersService,
              private router: Router) { }
  
  user: firebase.User;
  public user_uid: String;
  public basePath: String;

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.user_uid = this.user.uid;
    this.basePath = '/chantiers/' + this.user_uid;
    console.log(this.basePath);
    this.initForm();
  }
 
  initForm() {
    this.chantierForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSaveChantier() {
    const title = this.chantierForm.get('title').value;
    const author = this.chantierForm.get('author').value;
    const synopsis = this.chantierForm.get('synopsis').value;
    const newChantier = new Chantier(title, author);
    newChantier.synopsis = synopsis;
    this.chantiersService.createNewChantier(this.basePath, newChantier);
    this.router.navigate(['/chantiers']);
  }

}

