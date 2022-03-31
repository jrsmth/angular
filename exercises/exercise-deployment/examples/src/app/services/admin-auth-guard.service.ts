import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate() {
    let user = this.authService.currentUser;
    if (user && user.admin) return true;
      // we use 'user' as a condition to check if the value is not-null
        // if 'user' was null, 'user.admin' would break our application at runtime 

    this.router.navigate(['/no-access']);
    return false;
  }
}
