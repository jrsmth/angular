import { AbstractControl } from '@angular/forms';
import { UsernameValidator } from './../common/validators/username.validators';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
      accountUsername: new FormControl(),
      topics: new FormArray([ ])
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

  get topics() {
    return this.form.get('account.topics') as FormArray;
  }

  login() {
    let isValid = this.authService.login(this.form.value);

    if (!isValid) {
      this.form.setErrors({
        invalidLogin: true
      })
    }
  }

  addTopic(topic: HTMLInputElement) {
    this.topics.push(new FormControl(topic.value));
    topic.value = '';
  }

  removeTopic(topic: AbstractControl) {
    let index = this.topics.controls.indexOf(topic);
    this.topics.removeAt(index);
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
