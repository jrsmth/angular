import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {

  log(obj: NgModel){
    console.log(obj);
  }


}
