import { UsernameValidator } from './../common/validators/username.validators';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form = new FormGroup({
    username: new FormControl(
      '', [
      Validators.required,
      Validators.minLength(6),
      UsernameValidator.cannotContainSpace], 
      UsernameValidator.shouldBeUnique),
    password: new FormControl(
      '', 
      Validators.required),
    account: new FormGroup({
      acccountUsername: new FormControl()
    })
  })
  authService = new AuthService();

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get accountUsername() {
    return this.form.get('account.accountUsername');
  }

  login() {
    let isValid = this.authService.login(this.form.value);

    if (!isValid) {
      this.form.setErrors({
        invalidLogin: true
      })
    }
  }

}

// for demo puposes
class AuthService {

  constructor() { }

  login(credentials: Object) {
    console.log(credentials);
    // HTTP Request
    return false; // invalid login
  }

}
