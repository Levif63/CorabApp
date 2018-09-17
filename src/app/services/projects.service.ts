import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../models/project.model';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'

@Injectable()
export class ProjectsService {
  projectList: AngularFireList<any>;
  selectedProject: Project = new Project("","");
  constructor(private firebase :AngularFireDatabase ) { };
 
  
  projects: Project[] = [];
  projectsSubject = new Subject<Project[]>();
  projectData: AngularFireList<any>;

  emitProjects() {
    this.projectsSubject.next(this.projects);
  }

  getData(){
    this.projectList = this.firebase.list('projects');
    return this.projectList;
  }


  createNewProject(newProject: Project) {
    if(!this.projectList){
      this.projectList = this.getData();
    }
    this.projectList.push(
    {
      photo: newProject.photo,
      synopsis: newProject.synopsis,
      title: newProject.title,
      author: newProject.author,      
    });
    this.emitProjects();
  }


  updateProject(updateProject: Project): void {

    this.projectList.update(updateProject.$key,
    {
      photo: updateProject.photo,
      synopsis: updateProject.synopsis,
      title: updateProject.title,
      author: updateProject.author,      
    }); 
    this.emitProjects();    
 }


}
