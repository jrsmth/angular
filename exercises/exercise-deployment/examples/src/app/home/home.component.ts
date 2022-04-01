import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  textColor = environment.textColor;

  constructor(private _authService: AuthService) { }

  get authService() {
    return this._authService;
  }

}
