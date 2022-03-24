import { CurrentPasswordValidator } from './../common/validators/current-password.validators';
import { NewPasswordValidator } from './../common/validators/new-password.validators';
import { ConfirmPasswordValidator } from '../common/validators/confirm-password.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.css']
})
export class ChangePasswordFormComponent {

  form: FormGroup;

  constructor(fb: FormBuilder) { 
    this.form = fb.group({
      passwordCurrent: ['', Validators.required, CurrentPasswordValidator.mustBeCurrentPassword],
      passwordNew: ['', [Validators.required, NewPasswordValidator.mustNotMatchCurrentPassword]],
      passwordConfirm: ['', [Validators.required, ConfirmPasswordValidator.mustMatchNewPassword]]
    })
  }

  get passwordCurrent() {
    return this.form.get('passwordCurrent');
  }

  get passwordNew() {
    return this.form.get('passwordNew');
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm');
  }

  submitChangePassword() {
    // HTTP Request to backend using service object

    if (this.form.valid) {
      console.log(this.form.value);
      this.form.reset();
    } else {
      this.form.setErrors({
        invalidPasswordChange: true
      });
    }
  }

}
