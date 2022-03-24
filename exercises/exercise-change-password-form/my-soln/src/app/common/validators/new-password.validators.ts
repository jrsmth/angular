import { AbstractControl, FormGroup, ValidationErrors } from "@angular/forms";

export class NewPasswordValidator {

    static mustNotMatchCurrentPassword(control: AbstractControl): ValidationErrors | null {
        
        let group = control.parent as FormGroup;

        if (group != null) {
            let passwordCurrent = group.get('passwordCurrent')?.value;
            let passwordNew = group.get('passwordNew')?.value;

            return (passwordCurrent != passwordNew) ? null : { notNew: {
                message: "New password must be different."
            } }
        }

        return null;

    }

}