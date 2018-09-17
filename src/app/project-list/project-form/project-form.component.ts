import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference  } from 'angularfire2/storage';
import { Observable, from } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;
  fileIsUploading = false;
  fileName: string;
  fileUploaded = false;
  task: AngularFireUploadTask;
  ref: AngularFireStorageReference;
  uploadProgress: Observable<number | undefined>;
  downloadUrl: Observable<string>;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService,
              private router: Router, private storage: AngularFireStorage) { }
              
  ngOnInit() {
    this.initForm();
  }
 
  initForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSaveProject() {
    const title = this.projectForm.get('title').value;
    const author = this.projectForm.get('author').value;
    const synopsis = this.projectForm.get('synopsis').value;
    const newProject = new Project(title, author);
    const url = document.getElementById("image1");
    newProject.synopsis = synopsis;
    console.log(url.getAttribute('href'));
    if(url.getAttribute('href') && url.getAttribute('href') !== '') {
      newProject.photo = url.getAttribute('href');
    }
    this.projectsService.createNewProject(newProject);
    this.router.navigate(['/projects']);
  }

  upload(event) {
    const randomId = Math.random().toString(36).substring(2);
    const file = event.target.files[0];
    const filePath = 'images/' + randomId;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadProgress = task.percentageChanges();
    // get notified when the download URL is available
    this.downloadUrl = fileRef.getDownloadURL()
  }




}

