## Angular Material 2
* What is Angular Material?
    * It is a library of reusable, high-quality UI components that are built with Angular/Typescript.
    * They are:
        * Internationalised (multi-language)
        * Well-documented
        * Well-tested
        * Easy to use (clean and simple API)
        * Customisable
        * Fast (performant)
    * Docs: 
        * https://material.angular.io/
    * Angular Material is comparable with Bootstrap but is built-specifically for Angular. Hence it makes more sense to use Angular Material where possible, as it reduces your dependencies on 3rd party libraries and is easier to build into your application.
* Installation  
    * In this section, my examples can be found in ```../exercises/exercise-ng-material/examples```
    * [Installation Guide](https://material.angular.io/guide/getting-started)
        * ```ng add @angular/material```
            * installs: Angular Material, the Component Dev Kit (CDK) and Angular Animations
            * asks you to select a theme, set up typography and set up animations
            * to use a component, you reference it (as normal) in the template (finding the tag name in the [docs](https://material.angular.io/)) and then import the corresponding module into ```app.module.ts```.
* Checkbox
    * example:
        ```typescript
            // app.component.ts
            export class AppComponent {
                title = 'examples';
                isChecked = true;

                onChange(event: any) {
                    console.log(event);
                }
            }
        ```
        ```html
            <!-- app.component.html -->
            <mat-checkbox
                #showDetails
                [checked]="isChecked"
                (change)="onChange($event)">
                Show details
            </mat-checkbox>

            <div 
                *ngIf="showDetails.checked"> 
                Some details... 
            </div>
        ```
* Radio Buttons
    * Radio buttons, unlike checkboxes, only allow for a single option to be selected.
    * Remember to import the corresponding module into ```app.module.ts```
    * example:
        ```css
            /* app.component.css */
            .mat-radio-button ~ .mat-radio-button {
                margin-left: 16px;
            }
        ```
        ```html
            <!-- app.component.html -->
            <mat-radio-group aria-label="Select an option">
                <mat-radio-button value="1">
                    Male
                </mat-radio-button>
                <mat-radio-button value="2">
                    Female
                </mat-radio-button>
            </mat-radio-group>
        ```
* Selects
    * Remember to use the ```ngModel``` directive, we need to import the ```FormsModule``` into ```app.module.ts```.
    * example:
        ```typescript
            // app.component.ts
            ...
            colours = [
                { id: 0, name: "Red" },
                { id: 1, name: "Green" },
                { id: 2, name: "Blue" }
            ];

            colourIdSelected = 1;

            onColourChange(id: number) {
                this.colourIdSelected = id;
            }
            ...
        ```
        ```html
            <!-- app.component.html -->
            <mat-form-field appearance="fill">
                <mat-label
                    [style.color]="colours[colourIdSelected]">
                    Favorite colour
                </mat-label>
                <mat-select
                    [(ngModel)]="colourIdSelected">
                    <mat-option 
                    *ngFor="let colour of colours" 
                    [value]="colour.id">
                    {{ colour.name }}
                    </mat-option>
                </mat-select>
            </mat-form-field>
        ```
* Inputs
    * The class names 'form-group' and 'form-control' are conventions that we use with bootstrap/regular form building. We drop these when working with Angular Material inputs.
        * inputs, textareas, date pickers, etc need to be wrapped in a ```<mat-form-field>``` element.
    * example:
        ```css
            /* app.component.css */
            .example-form {
                min-width: 150px;
                max-width: 500px;
                width: 100%;
            }

            .example-full-width {
                width: 100%;
            }
        ```
        ```html
            <!-- app.component.html -->
            <form class="example-form">
                <mat-form-field class="example-full-width" appearance="fill">
                    <mat-label>Favorite food</mat-label>
                    <input matInput placeholder="Ex. Pizza" value="Sushi">
                </mat-form-field>

                <mat-form-field class="" appearance="fill">
                    <input 
                    ngModel
                    #username="ngModel"
                    name="username"
                    matInput 
                    type="text" 
                    placeholder="username" 
                    required>
                    <span matPrefix>admin.</span>
                    <span matSuffix>@domain.co.uk</span>
                    <mat-error *ngIf="username.invalid && username.errors?.['required']"> 
                    The username is required
                    </mat-error>
                </mat-form-field> <!-- showcase only, looks dodgey -->

                <mat-form-field class="example-full-width" appearance="fill">
                    <mat-label>Leave a comment</mat-label>
                    <textarea 
                        matInput 
                        cdkTextareaAutosize
                        #autosize="cdkTextareaAutosize"
                        cdkAutosizeMinRows="2"
                        placeholder="Ex. It makes me feel...">
                    </textarea>
                    <mat-hint>Tell us what you really think!</mat-hint>
                </mat-form-field>
                </form>
        ```
* TextAreas
    * see the 'Input' section above for an example
        * note the use of the ```cdkTextareaAutosize``` directive; it auto-scales the textbox size, depending on the content.
            * Also note that previously, Angular Materials followed a ```md-``` prefix naming convention - currently, it uses a ```mat-``` prefix.
    * Another [example](https://stackblitz.com/angular/pbadbpbgyog?file=app%2Ftext-field-autosize-textarea-example.html)
* Date Pickers
    * At present, you also need to import ```MatNativeDateModule``` into ```app.module.ts```, alongside the standard date picker import - in order to work with native date objects in Angular.
    * The ```touchUi="true"``` property on the ```<mat-datepicker>``` element improves the user experience on small devices, like mobile phones - I think its less effective (then the default setting) on regular browsers.
    * We can restrict the valid dates for our input by adding property binding to our ```<input>``` element and binding the 'min' and 'max' properties to fields in our component typescript class.
    * example:
        ```typescript
            // app.component.ts
            ...
            minDate = new Date(2017, 0, 1); // 1st Jan 2017
            maxDate = new Date(2017, 8, 1); // 1st Sept 2017
            ...
        ```
        ```html
            <!-- app.component.html -->
            ...
            <mat-form-field 
                appearance="fill">
                <mat-label>
                    Choose your birthdate
                </mat-label>
                <input 
                    (focus)="birthdate.open()"
                    matInput 
                    [min]="minDate"
                    [max]="maxDate"
                    [matDatepicker]="birthdate">
                <mat-datepicker-toggle
                    matSuffix [for]="birthdate">
                </mat-datepicker-toggle>
                <mat-datepicker 
                    #birthdate
                    touchUi="true"> 
                </mat-datepicker>
            </mat-form-field>
            </form>
        ```
* Icons
    * Like with Bootstrap, in Angular Materials we can work with a set of professional icons:
        * https://fonts.google.com/icons?selected=Material+Icons
    * In order to use this Google fonts set of icons, we need to import the following stylesheet into our global ```styles.css``` file.
        * ```@import "https://fonts.googleapis.com/icon?family=Material+Icons";```
            * We then import the ```MatIconModule``` into ```app.module.ts```
                * ```import {MatIconModule} from '@angular/material/icon'```
    * To use a specific ```<ICON_NAME>```, we add the following to our template: 
        * ```<mat-icon><ICON_NAME></mat-icon>```
    * We can change the colour of an icon by using CSS or our own custom-theme.
    * example:
        ```css
            /* app.component.css */
            .add-photo {
                color: cornflowerblue;
            }
        ```
        ```html
            <!-- app.component.html -->
            <mat-icon class="add-photo">add_a_photo</mat-icon>            
        ```
* Buttons
    * 


<br>
<br>
<br>


    * example:
        ```typescript
            // app.component.ts

        ```
        ```html
            <!-- app.component.html -->
            
        ```