import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(state: ActivatedRouteSnapshot) {
    if (this.authService.isLoggedIn()) 
      return true;
    
    this.router
      .navigate(['/login'], { queryParams: { returnUrl: state.url }} );
    return false;
  }
}
