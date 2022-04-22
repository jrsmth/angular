import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  constructor(private auth: AngularFireAuth) {}

  login(){
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // docs for Firebase Authentication
      // https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
  }

}
