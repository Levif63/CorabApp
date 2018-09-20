import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chantier } from '../../models/chantier.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ChantiersService } from '../../services/chantiers.service';



@Component({
  selector: 'app-edit-chantier',
  templateUrl: './edit-chantier.component.html',
  styleUrls: ['./edit-chantier.component.css']
})
export class EditChantierComponent implements OnInit {

  editForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  chantier: Chantier;

  constructor(private formBuilder: FormBuilder, private chantiersService: ChantiersService,
              private router: Router, private route: ActivatedRoute) { }
              
  ngOnInit() {

    const id = this.route.snapshot.params['id'];
  }





}