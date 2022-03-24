import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class CurrentPasswordValidator {

    static mustBeCurrentPassword(control: AbstractControl): Promise<ValidationErrors | null> {

        return new Promise((resolve) => {
            setTimeout(() => { // simulate AJAX delay
                if (control.value != '1234')
                    resolve({ mustBeCurrent: {
                        message: 'Password is incorrect'
                    }});
                else 
                    resolve(null);
            }, 2000); // delay for 2 seconds
        });
    }

}