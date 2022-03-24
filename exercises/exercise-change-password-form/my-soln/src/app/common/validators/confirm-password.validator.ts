import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class ConfirmPasswordValidator {

    static mustMatchNewPassword(control: AbstractControl): ValidationErrors | null {
        
        let group = control.parent as FormGroup;

        if (group != null) {
            let passwordNew = group.get('passwordNew')?.value;
            let passwordConfirm = group.get('passwordConfirm')?.value;

            return (passwordNew === passwordConfirm) ? null : { noMatch: {
                message: "Confirm password must match."
            } }
        }

        return null;

    }

}