import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';



@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  editForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  project: Project;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService,
              private router: Router, private route: ActivatedRoute) { }
              
  ngOnInit() {

    const id = this.route.snapshot.params['id'];
  }

  
  onSaveProject() {
    this.project = new Project('', '');
    this.project.title = this.editForm.get('title').value;
    this.project.author = this.editForm.get('author').value;
    this.project.synopsis = this.editForm.get('synopsis').value;
    if(this.fileUrl && this.fileUrl !== '') {
      this.project.photo = this.fileUrl;
    }
    this.projectsService.updateProject(this.project);
    this.router.navigate(['/projects']);
  }




}