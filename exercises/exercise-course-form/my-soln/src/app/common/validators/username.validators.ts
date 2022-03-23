import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidator {

    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if ((control.value as string).indexOf(' ') != -1)
            return { cannotContainSpace: {
                        message: "Username cannot contain spaces."
                    }};
        
        return null;
    }

    // ^if ((control.value as string).indexOf(' ') != -1) 
    // this tests if our string contains a space
        // alt: ((control.value as string).indexOf(' ') >= 0)

    static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => { // simulate AJAX delay
                if (control.value === 'JRSmiffy')
                    resolve({ shouldBeUnique: {
                        message: 'Username \'' + control.value + '\' is already taken.'
                    }});
                else 
                    resolve(null);
            }, 2000); // delay for 2 seconds
        });
    }
}


