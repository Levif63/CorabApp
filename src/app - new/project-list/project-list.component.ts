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
  }

  onNewProject() {
    this.router.navigate(['/projects', 'new']);
  }

  onDeleteProject(project: Project) {
    this.projectsService.removeProject(project);
  }

  onViewProject(id: number) {
    this.router.navigate(['/projects', 'view', id]);
  }
  
  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}