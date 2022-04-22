import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar', // bootstrap-navbar
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent {
  user$: Observable<firebase.User | null>;

  constructor(public auth: AngularFireAuth) {
    this.user$ = auth.authState;
   }

  logout() {
    this.auth.signOut();
  }

}
