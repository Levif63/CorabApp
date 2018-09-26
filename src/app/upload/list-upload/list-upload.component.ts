import { Component, OnInit  } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Chantier } from '../../models/chantier.model';
import { Observable } from 'rxjs';
import { UploadFileService } from '../upload-file.service';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'list-upload',
  templateUrl: './list-upload.component.html',
  styleUrls: ['./list-upload.component.css']
})
export class ListUploadComponent implements OnInit {
  
  user: firebase.User;
  fileUploads: Observable<any[]>;

  constructor(private uploadService: UploadFileService, private router: Router, private route: ActivatedRoute, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.user = firebase.auth().currentUser;
    const path = '/chantiers/' + this.user.uid + '/' + this.route.snapshot.params['id'] + '/plan';
    console.log(path);
    this.fileUploads = this.db.list(path).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );

  }

  getFileUploads(path) {
    return this.uploadService.getFileUploads(path);
  }

  deleteFileUpload(fileUpload) {
    this.uploadService.deleteFileUpload(fileUpload);
  }
}