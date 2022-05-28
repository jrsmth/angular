import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([]) // this import is required, even though no routes are specified here
  ],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
