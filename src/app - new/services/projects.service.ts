import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Project } from '../models/project.model';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class ProjectsService {

  projects: Project[] = [];
  projectsSubject = new Subject<Project[]>();

  emitProjects() {
    this.projectsSubject.next(this.projects);
  }

  saveProjects() {
    firebase.database().ref('/projects').set(this.projects);
  }

  getProjects() {
    firebase.database().ref('/projects')
      .on('value', (data: DataSnapshot) => {
          this.projects = data.val() ? data.val() : [];
          this.emitProjects();
        }
      );
  }

  getSingleProject(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/projects/' + id).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  constructor() {
    this.getProjects();
  }

  createNewProject(newProject: Project) {
    this.projects.push(newProject);
    this.saveProjects();
    this.emitProjects();
  }

  removeProject(project: Project) {
    const projectIndexToRemove = this.projects.findIndex(
      (projectEl) => {
        if(projectEl === project) {
          return true;
        }
      }
    );
    this.projects.splice(projectIndexToRemove, 1);
    this.saveProjects();
    this.emitProjects();
  }
}