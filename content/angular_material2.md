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
                    placeholder="Ex. It makes me feel...">
                    </textarea>
                    <mat-hint>Tell us what you really think!</mat-hint>
                </mat-form-field>
                </form>
        ```
* TextAreas


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