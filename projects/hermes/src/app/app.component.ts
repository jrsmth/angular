import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hermes';

  constructor(private userService: UserService, private auth: AuthService, router: Router) {
    auth.user$.subscribe(user => {
      // if (user) {
        // userService.save(user); // note, we save the user everytime they log in - a bit unusual but necessary for this firebase app (Google details might change, no registraion section)

      //   let returnUrl = localStorage.getItem('returnUrl');
      //   if (returnUrl) {
      //     localStorage.removeItem('returnUrl');
      //     router.navigateByUrl(returnUrl);
      //   }
      // }

      //^ note, we can refactor this nested if block by reversing the conditions and using 'return;'
      if (!user) return;

      userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    })
  } 
  /* 
    We could implement the onDestroy interface and manually unsubscribe from this Observable 
    However, in practise, we don't need to worry about memory leaks here because there will only be once instance of AppComponent in our app
  */ 
}
