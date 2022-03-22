import { Component } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  log(model: NgModel){
    console.log(model);
  }

  submit(form: NgForm) {
    console.log(form.value);
    console.log(form);
  }


}
