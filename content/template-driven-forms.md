## Template-Driven Forms
* Building a Bootstrap Form
    * see example in ```../exercises/exercise-zippy-component/my-soln```
* Types of Forms
    * In Angular there is a class called ```FormControl``` that is used to manage input fields in our application.
        * Every input field requires an instance of the ```FormControl``` class and has the following properties:
            * value
            * touched / untouched - mouse click or not
            * dirty / pristine - value changed or not
            * valid
            * errors
        * We use a ```FormControl``` object to track the state changes and validity of the input field that the object is bound to.
    * Similarly, there is a class called ```FormGroup``` - which contains one or more ```FormControl```'s.
        * In a simple application, we probably would only need a single ```FormGroup```
        * In a larger one, we may have multiple distinct forms (such as Billing and Shipping), and so we would encapsulate each one in its own separate ```FormGroup```.
        * ```FormGroup``` has all of the same properties as ```FormControl``` - this makes it easier to gather together validation errors and values, as we don't have it iterate over each ```FormControl``` input field to get its status.    
        <br>
        <img src='../resources/form_group.png' alt='Form Group' width='500'>
        
        <br>
    * There are two ways to create these form objects:
        * Template-driven: using directives
            * good for simple forms
            * simple validation
            * easier to create
            * less code
        * Reactive: using explicit code
            * more control over validation logic
            * good for complex forms
            * unit testable
* Building Template Driven Forms
    * When we apply the ```ngModel``` directive to an input field, an associated ```FormControl``` object is created under the hood.
        * example: 
            * ```<input ngModel name="firstName" id="firstName" type="text" class="form-control">```
                * ```ngModel name="<NAME>"``` is required to create the ```FormControl``` object. 
                * remember to import ```FormsModule``` into ```app.module.ts```
        * extended example:
            ```javascript
                // contact-form.component.html
                <form>
                    <div class="form-group">
                        <label for="firstName">First Name</label>
                        <input ngModel name="firstName" #firstName="ngModel" (change)="log(firstName)" id="firstName" type="text" class="form-control">
                    </div>
                    ...
                </form>

                // contact-form.component.ts
                log(obj: Object){
                    console.log(obj);
                }
            ``` 
            * This is the ```ngModel``` object result in the console - it contains the ```FormControl``` object for this input field and can be used to track the state changes and validity.
                <br>
                <br>
                <img src='../resources/form_control_obj.png' alt='Form Control Object' width='500'>
                <br>
                <br>
* Validation
    * One piece of validation that we can implement is to make a field be ```required``` - we do this using the inbuilt HTML5 ```required``` attribute on the desired input form. Then we can use ```ngIf``` to render an error message if ```templateVarForNgModel.touched && !templateVarForNgModel.valid```
        * example:
            ```javascript
            // app.component.html
            <form>
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input 
                        required 
                        ngModel 
                        name="firstName" 
                        #firstName="ngModel" 
                        (change)="log(firstName)" 
                        id="firstName" 
                        type="text" 
                        class="form-control"
                    >
                    <div class="alert alert-danger" *ngIf="firstName.touched && !firstName.valid">First name is required</div>
                </div>
                ...
            </form>
            ```
    * In Angular, there are a few validators that build upon the HTML5 validation attributes (as we have seen with ```required```).
        * example:
            ```html
                <input 
                    required
                    minlength="3"
                    maxlength="10" 
                    pattern="^[a-zA-Z]*$"
                    ...>
                <div 
                    class="alert alert-danger" 
                    *ngIf="firstName.touched && !firstName.valid">
                    <div *ngIf="firstName.errors?.['required']">
                        First name is required.
                    </div>
                    <div *ngIf="firstName.errors?.['minlength']">
                        First name must be atleast {{ firstName.errors?.['minlength'].requiredLength }} characters.
                    </div>
                    <!-- Input prevents any more characters than <maxlength> for us -->
                    <div *ngIf="firstName.errors?.['pattern']">
                        First Name must be alphabetical.
                    </div>
                </div>
            ```
            * See [this](https://stackoverflow.com/questions/70106472/property-fname-comes-from-an-index-signature-so-it-must-be-accessed-with-fn) Stack Overflow question about ```.minlength``` vs ```.['minlength']```
            * See [this](https://stackoverflow.com/questions/336210/regular-expression-for-alphanumeric-and-underscores) for more info on Regex
    * Styling Invalid Input Fields
        * There are ```ng-``` class names applied to an input field when we bind it to a ```FormControl``` - these include ```ng-touched```, ```ng-invalid```, etc. We can use these class names to apply CSS to input field when the state changes.
            * example: when the input field is touched and invalid, it will receive ```class="ng-invalid ng-dirty ng-touched"```
                * We can then apply the following CSS:
                    ```css
                        /* src/styles.css */
                        .form-control.ng-touched.ng-invalid { border: 1px solid crimson; }
                    ```
                    * note, we should always give input fields the className ```.form-control```
* Cleaner Templates
    * Code should be written to be read easily by yourself and by fellow developers; there is a way to structure your templates to improve readability. As a general rule, you should have to scroll horizontally to read long lines of code - better to separate long lines into multiple shorter lines.
    * example:
        ```html
            <input 
                required // all validation attr
                ngModel 
                name="firstName" 
                #firstName="ngModel" // template var
                id="firstName" 
                type="text" 
                class="form-control">
            <!-- note this is the preferred order of attr's in an input field -->
        ```
* ngForm
    * As a reminder: ```ngModel```, when applied to an input field, creates a ```FormControl``` object under the hood and binds it to that input field.
        * The other use for ```ngModel``` is for two-way binding: ```[( )]```
    * ```ngForm``` is automatically applied to ```<form>``` elements to create a ```FormGroup``` object under the hood.
    * ```ngForm``` has an output property called ```ngSubmit``` which is used to raise a custom event when the form is submit - with this, we can retrieve the input field values from the ```FormGroup``` object in our component.
    * example:
        ```javascript
            // contact-form.component.html
            <form #form="ngForm" (ngSubmit)="submit(form)">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input 
                        required
                        minlength="3"
                        maxlength="10" 
                        pattern="^[a-zA-Z]*$"
                        ngModel 
                        name="firstName" 
                        #firstName="ngModel" 
                        (change)="log(firstName)" 
                        id="firstName" 
                        type="text" 
                        class="form-control">
                    <div 
                        class="alert alert-danger" 
                        *ngIf="firstName.touched && !firstName.valid">
                        <div *ngIf="firstName.errors?.['required']">
                            First name is required.
                        </div>
                        <div *ngIf="firstName.errors?.['minlength']">
                            First name must be atleast {{ firstName.errors?.['minlength'].requiredLength }} characters.
                        </div>
                        <!-- Input prevents any more characters than <maxlength> for us -->
                        <div *ngIf="firstName.errors?.['pattern']">
                            First Name must be alphabetical.
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <label for="comment">Comment</label>
                    <textarea 
                        ngModel 
                        name="comment" 
                        id="comment" 
                        cols="30" rows="10" 
                        class="form-control">
                    </textarea>
                </div>
                <button class="btn btn-primary" type="submit">
                    Submit
                </button>
            </form>

            // contact-form.component.ts
            submit(form: NgForm) {
                console.log(form.value);
                console.log(form);
            }
        ``` 
        * This is the ```ngForm``` object result in the console - it contains the ```FormGroup``` object for this ```<form>``` and can be use to retrieve the input values for the whole form.
            <br>
            <br>
            <img src='../resources/form_group_obj.png' alt='Form Group Object' width='500'>
            <br>
            <br>
