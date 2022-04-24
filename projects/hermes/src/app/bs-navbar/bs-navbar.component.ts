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

  constructor(public service: AuthService) { }

  logout() {
    this.service.logout();
  }

}
