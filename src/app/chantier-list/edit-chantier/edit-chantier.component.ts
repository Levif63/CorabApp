import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chantier } from '../../models/chantier.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChantiersService } from '../../services/chantiers.service';
import { Subject, Observable } from 'rxjs';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-edit-chantier',
  templateUrl: './edit-chantier.component.html',
  styleUrls: ['./edit-chantier.component.css']
})
export class EditChantierComponent implements OnInit {

  user: firebase.User;
  user_uid: String;
  chantier: Observable<any>;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  editChantierForm: FormGroup;


  constructor(private formBuilder: FormBuilder, private chantiersService: ChantiersService,
              private router: Router, private route: ActivatedRoute) { }
              
  ngOnInit() {
    this.user = firebase.auth().currentUser;
    this.user_uid = this.user.uid;    
    const path = '/chantiers/' + this.user_uid + '/' + this.route.snapshot.params['id'];
    this.chantier = this.getSingleChantier(path);
    this.initForm();
  }

  initForm() {
    this.editChantierForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }

  getSingleChantier(path) {    
    return this.chantiersService.getSingleChantier(path);
  }

  onBack() {
    this.router.navigate(['/chantiers']);
  }
}