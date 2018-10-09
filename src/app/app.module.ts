import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ChantierListComponent } from './chantier-list/chantier-list.component';
import { SingleChantierComponent } from './chantier-list/single-chantier/single-chantier.component';
import { ChantierFormComponent } from './chantier-list/chantier-form/chantier-form.component';
import { EditChantierComponent } from './chantier-list/edit-chantier/edit-chantier.component';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './header/header.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ChantiersService } from './services/chantiers.service';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import { ListUploadComponent } from './upload/list-upload/list-upload.component';
import { DetailsUploadComponent } from './upload/details-upload/details-upload.component';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'chantiers', canActivate: [AuthGuardService], component: ChantierListComponent },
  { path: 'chantiers/new', canActivate: [AuthGuardService], component: ChantierFormComponent },
  { path: 'chantiers/view/:id', canActivate: [AuthGuardService], component: SingleChantierComponent },
  { path: 'chantiers/edit/:id', canActivate: [AuthGuardService], component: EditChantierComponent },
  { path: '', redirectTo: 'chantiers', pathMatch: 'full' },
  { path: '**', redirectTo: 'chantiers' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ChantierListComponent,
    SingleChantierComponent,
    ChantierFormComponent,
    HeaderComponent,
    ChantierListComponent,
    EditChantierComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB0IMheWsaKO0u8ea5wv7sxHRTy4K6750Q&libraries',
      libraries: ['geometry']
    }),
    AgmDirectionModule
  ],
  providers: [AuthService, ChantiersService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
