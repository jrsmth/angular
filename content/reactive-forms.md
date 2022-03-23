## Reactive Forms
* With Reactive Forms, form objects are explicitly created by the developer in the component; unlike Template-driven Forms, where we use directives to enable Angular to create ```FormControls/Group``` objects for us.
    * We create Reactive forms when we want finer control over the structure and behaviour of the forms.
    * They are also easier to unit test.
* Reactive Forms are required when we want to dynamically render a form, based on an object structure that we retrieve from a backend service. 
* Creating Controls Programmatically
    * The class ```AbstractControl``` is the base class for ```FormControl``` and ```FormGroup``` - they both extend it.
    * steps:    
        1. import ```FormsModule``` and ```ReactiveFormsModule``` into ```app.module.ts```
        2. Create the ```FormGroup``` and nested ```FormControl``` objects, programmatically (```form = new FormGroup(...)```), in your form component
        3. Property bind the ```[formGroup]=<FORM_PROPERTY>``` directive to your form property on the ```<form>``` tag and apply the ```formControlName=<FORM_PROPERTY_FIELD_NAME>``` directive to the ```<input>``` fields that correspond to each field in your form object.
    * example:
        * this example is in ```../exercises/exercise-course-form/my-soln```
        ```html
            <!-- signup-form.component.html -->
            <form [formGroup]="form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                        formControlName="username"
                        id="username" 
                        type="text" 
                        class="form-control">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        formControlName="password"
                        id="password" 
                        type="text" 
                        class="form-control">
                </div>
                <button class="btn btn-primary" type="submit">Sign Up</button>
            </form>
        ```
        ```typescript
            // signup-form.component.ts
            export class SignupFormComponent {
                form = new FormGroup({
                    username: new FormControl(),
                    password: new FormControl()
                    // note, you can quote these fields
                    // if you need to use special names
                        // e.g 'user-age'
                })
            }
        ```
* Adding Validation
    * With Template-driven Forms, we added validation by using HTML5 validation attributes on our ```<input>``` fields. When working with Reactive Forms, we assign validators upon creating the ```FormControl``` objects in our component.
        * A ```FormControl``` object takes in as one of its optional parameters, a ```Validators``` function or array of ```Validators``` functions - note, we don't call the method, we are referencing the method name only and so drop the ```()```. Even when we do use ```()``` [e.g ```Validators.minlength(3)```], we are returning a Validator function.
            * The ```Validators``` class is part of ```@angular/forms``` and has several static methods:
                * ```Validators.required```
                * ```Validators.minLength(number)```
                * ```Validators.maxLength(number)```
                * ```Validators.pattern(regex)```
                * ```Validators.email```
        * steps:
            1. Assign one or more ```Validators``` functions when creating a ```FormControl``` object in the component
            2. Use ```<div *ngIf="property.touched && property.invalid">``` to render error messages in the template
            3. Use component getters to clean up the code
        * example:
        ```html
            <!-- signup-form.component.html -->
            <form [formGroup]="form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                        formControlName="username"
                        id="username" 
                        type="text" 
                        class="form-control">
                    <div 
                        *ngIf="username?.touched && username?.invalid"
                        class="alert alert-danger">
                        Username is required.
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input 
                        formControlName="password"
                        id="password" 
                        type="text" 
                        class="form-control">
                    <div 
                        *ngIf="password?.touched && password?.invalid"
                        class="alert alert-danger">
                        Password is required.
                    </div>
                </div>
                <button class="btn btn-primary" type="submit">Sign Up</button>
            </form>
        ```
        ```typescript
            // signup-form.component.ts
            ...
            form = new FormGroup({
                username: new FormControl('', Validators.required),
                password: new FormControl('', Validators.required)
            })

            get username() {
                return this.form.get('username');
            }

            get password() {
                return this.form.get('password');
            }
        ```
* Adding Specific Validation Errors
    * example
        ```html
            <!-- signup-form.component.html -->
            <form [formGroup]="form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                        formControlName="username"
                        id="username" 
                        type="text" 
                        class="form-control">
                    <div 
                        *ngIf="username?.touched && username?.invalid"
                        class="alert alert-danger">
                        <div *ngIf="username?.errors?.['required']">
                            Username is required.
                        </div>
                        <div *ngIf="username?.errors?.['minlength']">
                            Username must be minimum {{ username?.errors?.['minlength'].requiredLength }} characters.
                        </div>
                    </div>
                </div>
                ...
            </form>
        ```
        ```typescript
            // signup-form.component.ts
            ...
            form = new FormGroup({
                username: new FormControl('', [
                    Validators.required,
                    Validators.minLength(6)
                ]),
                password: new FormControl('', Validators.required)
            })
            ...
        ```
* Implementing Custom Validation
    * There is an interface called ```ValidatorFn``` that defines how we must create our own custom implementation of a validator.
    * In our component directory, we should create a ```Validators``` class that encapsulates all of the validators for a particular field.
        * example: ```src/app/common/validators/username.validators.ts```
            * as a best practise, we should put it in ```src/app/common/validators``` to make it neatly accessible across the whole application.
    * example:
        ```html
            <!-- signup-form.component.html -->
            <form [formGroup]="form">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input 
                        formControlName="username"
                        id="username" 
                        type="text" 
                        class="form-control">
                    <div 
                        *ngIf="username?.touched && username?.invalid"
                        class="alert alert-danger">
                        <div *ngIf="username?.errors?.['required']">
                            Username is required.
                        </div>
                        <div *ngIf="username?.errors?.['minlength']">
                            Username must be minimum {{ username?.errors?.['minlength'].requiredLength }} characters.
                        </div>
                        <div *ngIf="username?.errors?.['cannotContainSpace']">
                            {{ username?.errors?.['cannotContainSpace'].message }}
                        </div>
                    </div>
                </div>
                ...
            </form>
        ```
        ```typescript
            // signup-form.component.ts
            ...
            form = new FormGroup({
                username: new FormControl('', [
                    Validators.required,
                    Validators.minLength(6),
                    UsernameValidator.cannotContainSpace
                ]),
                password: new FormControl('', Validators.required)
            })
            ...

            // src/app/common/validators/username.validators.ts
            import { AbstractControl, ValidationErrors } from "@angular/forms";

            export class UsernameValidator {

                static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
                    if ((control.value as string).indexOf(' ') != -1)
                        return { cannotContainSpace: {
                                    message: "Username cannot contain spaces."
                                }};
                    
                    return null;
                }
            }

            // if ((control.value as string).indexOf(' ') != -1) 
                // this tests if our string contains a space
                    // alt: ((control.value as string).indexOf(' ') >= 0)
        ```
* Asynchronous Operations
