import { AppUser } from '../../shared/models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from '../../shared/services/user.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => {
        console.log(appUser);
        return appUser!.isAdmin
      }) // map Observable<AppUser | null> to Observable<boolean>
    )
  }

}