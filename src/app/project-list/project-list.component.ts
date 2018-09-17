import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects: Project[];
  projectsSubscription: Subscription;

  constructor(private projectsService: ProjectsService, private router: Router) {}

  ngOnInit() {
    this.projectsSubscription = this.projectsService.projectsSubject.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
      }
    );
    this.projectsService.emitProjects();
    var x = this.projectsService.getData();
    x.snapshotChanges().subscribe(item => {
      this.projects = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.projects.push(y as Project);
      });
    });
  }

  onNewProject() {
    this.router.navigate(['/projects', 'new']);
  }



  onEditProject(project: Project,id: number) {
    this.projectsService.selectedProject = Object.assign({}, project);
    this.router.navigate(['/projects', 'edit', id]);
  }

  onViewProject(project: Project, id: number) {
    this.projectsService.selectedProject = Object.assign({}, project);
    this.router.navigate(['/projects', 'view', id]);
  }
  
  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
  
}