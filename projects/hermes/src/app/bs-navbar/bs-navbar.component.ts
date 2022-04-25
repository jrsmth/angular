import { AppUser } from './../models/app-user';
import { Component } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'bs-navbar', // bootstrap-navbar
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  appUser: AppUser | null = null;

  constructor(private service: AuthService) { 
    service.appUser$.subscribe(appUser => this.appUser = appUser)
  }

  logout() {
    this.service.logout();
  }

}
