import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { SingleProjectComponent } from './project-list/single-project/single-project.component';
import { ProjectFormComponent } from './project-list/project-form/project-form.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProjectsService } from './services/projects.service';
import { UiModule } from './ui/ui.module';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'projects', canActivate: [AuthGuardService], component: ProjectListComponent },
  { path: 'projects/new', canActivate: [AuthGuardService], component: ProjectFormComponent },
  { path: 'projects/view/:id', canActivate: [AuthGuardService], component: SingleProjectComponent },
  { path: '', redirectTo: 'projects', pathMatch: 'full' },
  { path: '**', redirectTo: 'projects' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProjectListComponent,
    SingleProjectComponent,
    ProjectFormComponent,
    HeaderComponent,
    ProjectListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    UiModule
  ],
  providers: [AuthService, ProjectsService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
