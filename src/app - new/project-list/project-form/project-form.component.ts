import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {

  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private projectsService: ProjectsService,
              private router: Router) { }
              
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
    newProject.synopsis = synopsis;
    this.projectsService.createNewProject(newProject);
    this.router.navigate(['/projects']);
  }
}

