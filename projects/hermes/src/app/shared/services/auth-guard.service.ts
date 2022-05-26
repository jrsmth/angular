import { Injectable } from '@angular/core';
import { Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard { // drop the '-Service' by convention

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: Route, state: RouterStateSnapshot) {
    return this.auth.user$.pipe(map(user => {
        if (user) return true;

        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }))
  }
  /*
    if use .subscribe() on this Firebase Observable, we would need to somehow manually unsubscribe
    we have no template here (| async pipe) or component (no ngOnDestory)
    therefore we use the .map() operator to get Angular to automatically subscribe and unsubcribe on completion
  */
}
