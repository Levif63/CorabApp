import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../upload-file.service';
import { FileUpload } from '../fileupload';
import { ActivatedRoute, Router } from '@angular/router';
import { Chantier } from '../../models/chantier.model';
import * as firebase from 'firebase/app';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: { percentage: number } = { percentage: 0 };
  basePath: String =  '/chantiers';
  user: firebase.User;

  constructor(private uploadService: UploadFileService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
  }

  upload(basePath: string) {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;
    this.currentFileUpload = new FileUpload(file);
    this.user = firebase.auth().currentUser;
    this.basePath = '/chantiers/' + this.user.uid + '/' + this.route.snapshot.params['id'] + '/plan';
    this.uploadService.pushFileToStorage(this.basePath, this.currentFileUpload, this.progress);
  }
}
