import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectComponent implements OnInit {

  project: Project;

  constructor(private route: ActivatedRoute, private projectsService: ProjectsService,
              private router: Router) {}

  ngOnInit() {

    const id = this.route.snapshot.params['id'];
  }

  onBack() {
    this.router.navigate(['/projects']);
  }
}