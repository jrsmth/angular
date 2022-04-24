import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  constructor(private service: AuthService) {}

  login(){
    this.service.login();
      // Single Resposibility / Separation of Concerns: we should not have firebase mechanics on our component
  }

}
