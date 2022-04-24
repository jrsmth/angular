import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User | null>; // by convention, use -$ suffix for Observables

  constructor(public auth: AngularFireAuth, private route: ActivatedRoute, private router: Router) { 
    this.user$ = auth.authState;
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      result => console.log(result)
    );
    // docs for Firebase Authentication
      // https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
  }

  logout(){
    this.auth.signOut().then(
      () => console.log('logout')
    );

    this.router.navigate(['/login']);
  }
}
