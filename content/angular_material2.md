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
                * ```import {MatIconModule} from '@angular/material/icon;'```
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
    * We apply a ```mat-*-button``` directive to HTML ```<button>``` elements, rather than use a new ```<mat-*-button>``` element itself.
    * The ```mat-button``` directive that we apply to a ```<button>``` doesn't really look much like a button; Mosh recommends ```mat-raised-button``` instead - or other 'non-Basic' button types.
    * By default, buttons take their colour scheme from the theme's default colours; we can also use the ```color=""``` property and select 'primary', 'accent' and 'warn'. 
        * We can change the colours using CSS but this is not recommended because it is best practise to use a consistent theme for your materials.
    * 'FAB' buttons are Floating Action Buttons and take an icon as their label, not text.
    * example:
        ```html
            <!-- app.component.html -->
            <button mat-button>Basic Button</button>
            <button mat-raised-button color="primary">Raised Primary</button>
            <button mat-stroked-button color="accent">Stroked Accent</button>
            <button mat-flat-button color="warn">Flat Warn</button>
            <button mat-fab color="primary"><mat-icon>check</mat-icon></button>
        ```
* Chips
    * Chips in Angular are like tags for an object; they can be applied to highlight certain properties of that object, plus can be used for filtering.
    * We can set the ```color=""``` property for ```selected="true"``` Chips, in the same way we did for  Buttons, using the ```primary```, ```accent``` and ```warn``` values.
    * We can make Chips dynamic by using the ```*ngFor``` directive and iterating over a list of components in our component Typescript class.
    * example:
    ```typescript
        // app.component.ts
        ...
        courses = [
            { id: 1, name: "Beginnner", selected: false },
            { id: 2, name: "Intermediate", selected: false },
            { id: 3, name: "Advanced", selected: false },
        ];

        selectCategory(course: any) {
            this.courses
            .filter(c => c != course)
            .forEach(c => c['selected'] = false);

            course.selected = !course.selected;
        }
        ...
    ```
    ```html
        <!-- app.component.html -->
        <mat-chip-list>
            <mat-chip 
                selected="true" 
                color="accent">
                One
            </mat-chip>
            <mat-chip>
                Two
            </mat-chip>
            </mat-chip-list>
            <br>
            <mat-chip-list>
            <mat-chip 
                *ngFor="let course of courses"
                (click)="selectCategory(course)"
                [selected]="course.selected"
                id="courses-chip-{{course.id}}">
                {{ course.name }}
            </mat-chip>
        </mat-chip-list>
    ```
* Progress Spinners
    * Progress Spinners in Angular Materials have two modes:
        * Indeterminate:
            * when we don't know how much progress has been made (ex: awaiting async response from server).
            * in this case, the spinner spins fully on a loop.
            * we ignore the ```value=""``` property for the Indeterminate mode.
            * example: ```<mat-progress-spinner mode="indeterminate"></mat-progress-spinner>```
        * Determinate
            * when we do know how much progress has been made towards completion (ex: file upload).
            * in this case, the spinner is an arc that reflects the percentage completed.
            * we can property bind the ```value=""``` property to a field in our component Typescript class.
            * example: ```<mat-progress-spinner mode="determinate" value="33"></mat-progress-spinner>```
    * example:
        ```typescript
            // app.component.ts
            ...
            progress = 0;
            timer: any;
            isLoading = false;

            constructor() {
                this.restartTimer();
            }

            restartTimer() {
                this.progress = 0;
                this.timer = setInterval(() => {
                this.progress++;
                if (this.progress == 100) clearInterval(this.timer);
                }, 50); // increment every 50ms, ~5s total

                this.isLoading = true;
                this.getCourses()
                .subscribe(() => this.isLoading = false);
            }

            getCourses() {
                return timer(5000); // Oberservable
            }
            ...
        ```
        ```html
            <!-- app.component.html -->
            <mat-progress-spinner 
                mode="determinate" 
                [value]="progress">
            </mat-progress-spinner>
            <mat-progress-spinner 
                *ngIf="isLoading"
                mode="indeterminate">
            </mat-progress-spinner>
                <br><br>
            <button 
                mat-fab 
                color="primary" 
                (click)="restartTimer()">
                <mat-icon>restart_alt</mat-icon>
            </button>
        ```
* Tooltips
    * Tooltips are a text label that is shown when a user hovers over an element.
    * We can apply a Tooltip to an existing HTML element simply by adding the ```matTooltip``` directive and supply the text we wish to use as the label.
    * We have control over the positioning of the Tooltip label by using the ```matTooltipPosition``` property.
    * example:
        ```html
            <!-- app.component.html -->
            <button 
                mat-fab 
                color="primary" 
                matTooltip="Click to restart spinners"
                matTooltipPosition="right"
                (click)="restartTimer()">
                <mat-icon>restart_alt</mat-icon>
            </button>
        ```
* Tabs
    * You can control the animation timings with the ``` animationDuration``` property; in the same vein, you can completely remove the animation by using ``` animationDuration="0ms"```.
    * example:
        ```css
            /* app.component.css */
            .admin-body {
                padding: 20px;
            }
        ```
        ```html
            <!-- app.component.html -->
            <mat-tab-group
                animationDuration="0ms">
                <mat-tab 
                    class="admin"
                    label="Billing">
                    <div class="admin-body">
                    Billing Tab Content
                    </div>
                </mat-tab>
                <mat-tab 
                    class="admin"
                    label="Shipping">
                    <div class="admin-body">
                    Shipping Tab Content
                    </div>
                </mat-tab>
            </mat-tab-group>
        ```
* Dialogs
    * As far as I can tell, Angular Material Dialogs are for short 'conversations' between the user and the site; they are for ingesting data in a user friendly way.
    * Steps to Use
        * First, we create a new component ('edit-course') that we wish to display in the Dialog - usually some kind of form. We then need to inject the ```MatDialog``` Service into our ```app.component.ts``` class (where the dialog will be triggered). 
            * This service is required to open a Dialog and we inject it into class via constructor:
                ``` typescript
                    import { MatDialog } from '@angular/material/dialog';
                    ...
                    constructor(private dialog: MatDialog) {
                        this.restartTimer();
                    }
                ```
        * Next, in a method (that we bind to the ```(click)``` event of a button in our template), we use: 
            * ```this.dialog.open(<NAME_OF_COMPONENT_TO_OPEN>);```.
        * We need to register the ```<COMPONENT_TO_OPEN>``` in ```app.module.ts``` as an ```entryComponent``` - otherwise, Angular is unable to find this component when it compiles the DOM tree.
            * The ```entryComponents``` array takes in components that need to be added dynamically to the DOM tree.
        * Finally, we can use the ```mat-dialog-close="<VALUE>"``` directive to confirm or cancel the Dialog, in the component that gets opened ('edit-course'). We can subcribe to the Observable returned by the ```this.dialog.open()``` method and retrive ```<VALUE>```.
    * example:
        ```typescript
            // app.component.ts
            import { MatDialog } from '@angular/material/dialog';
            ...
            export class AppComponent {
                constructor(private dialog: MatDialog) {
                    ...
                }
                ...
                openDialog() {
                    this.dialog.open(EditCourseComponent)
                        .afterClosed()
                        .subscribe(result => console.log(result));
                }
            }

            // app.module.ts
            ...
            entryComponents: [
                EditCourseComponent
            ],
            ...
        ```
        ```html
            <!-- app.component.html -->
            <button
                (click)="openDialog()"
                mat-raised-button>
                Open Dialog
            </button>

            <!-- edit-course.component.html -->
            <p>Edit Course</p>
            <br>
            <button 
                mat-raised-button
                color="primary"
                mat-dialog-close="confirm">
                Confirm
            </button>
            <button 
                mat-raised-button
                color="warn"
                mat-dialog-close="cancel">
                Cancel
            </button>
        ```
* Passing Data to Dialogs
    * We pass data to our Dialog by supplying a second argument to ```this.dialog.open()```; this argument is an object that contains the data that we want to pass.
        * This data is passed into the constructor of the component ('edit-course') that we are opening.
        * Note, when we have a non-class/primitive type of constructor parameter (```num```, ```any```, etc.), we need to provide a custom injection token in the ```provider``` section of ```app.module.ts``` - without this you will see errors like: ```This type is not supported as injection token.```
            * We create a custom injection token for a constructor parameter by going to our component Typescript file and exporting a new constant ```InjectionToken('<PARAMETER_NAME>')``` - we also decorate the constructor parameter with ```Inject(PARAMETER_NAME)```, without speech marks. 
            * Next, we register this as a provider in our ```app.module.ts``` - under the providers section: ```{ provide: DIALOG_DATA, useValue: {} }```
        * Mosh was having us on, you don't need to define a custom injection token, as Angular Materials provides one for you - called: ```MAT_DIALOG_DATA```. The process above details what is going on behind the scenes.
    * To cut a long story short:
        * We can pass data to a Dialog, by using the second parameter of the ```open()``` method of our ```dialog``` service object.
        * To receive that data in the trigger component, we need to define a parameter in the constructor and decorate it with ```Inject(MAT_DIALOG_DATA)```
    * example:
        ```typescript
            // app.component.ts
            ...
            openDialog() {
                this.dialog.open(EditCourseComponent, {
                    data: { courseId: 1 }
                })
                .afterClosed()
                .subscribe(result => console.log(result));
            }
            ...

            // edit-course.component.ts
            ...
            constructor(@Inject(MAT_DIALOG_DATA) data: any) {
                console.log("Data", data);  
            }
            ...
        ```
* Creating a Reusable Module
    * At present, our ```app.module.ts``` module has become very bloated with numerous Angular Material component imports. 
    * We can make our ```app.module.ts``` more maintainbale and achieve better practise by spitting these imports out into a separate module and importing just that one module into ```app.module.ts```. 
        * This is good practise as it follows the software engineering principle of 'Cohesion'. That is, related things should be kept together and unrelated things should be kept apart.
    * We can generate a new module for this using the Angular CLI:
        * ```ng g module mat-components```
    * example:
        ```typescript
            // app.module.ts
            ...
            imports: [
                ...,
                MatComponentsModule
            ],

            // mat-components.module.ts
            @NgModule({
                exports: [
                    MatCheckboxModule,
                    MatRadioModule,
                    ...
                ]
            })
            export class MatComponentsModule { }

        ```
* Themes
    * A Theme is a collection of colour palletes that help to give our application a custom look and feel. Angular Materials took an opinionated approach and defined a set of preselected colours and shades for us to choose from.
    * We can specify which of our predefined colours to apply to a given element by using ```primary```, ```accent``` or ```warn```.
    * Themes very useful when it comes to modifying the colour scheme of our UI - if we decide to change the 'primary' colour, we need only change it in one central place and then all instances where we have referenced ```color="primary"``` will be updated. 
    * There is a tool to help you choose custom theme colours:
        * https://material.io/design/color/the-color-system.html#tools-for-picking-colors
    * SASS
        * Syntactically Awesome Style Sheets (SASS) is a CSS-preprocessor that allows us to write CSS with added features and then converts these features into normal CSS for use in the browser.
        * The relationship between SASS and CSS is similar to the relationship between TypeScript and JavaScript.
        * We can define a ```theme.scss``` in the ```/src``` directory of our application.
            * We also have to register this under the 'styles' section of ```angular.json```
                ```json
                    {
                        "$schema": "...",
                        "version": 1,
                        "newProjectRoot": "projects",
                        "projects": {
                            "examples": {
                            "projectType": "application",
                            "schematics": {
                                "..."
                            },
                            "root": "",
                            "sourceRoot": "src",
                            "prefix": "app",
                            "architect": {
                                "build": {
                                "builder": "...",
                                "options": {
                                    "..." : "...",
                                    "styles": [
                                        "./node_modules/@angular/material/prebuilt-themes/indigo-pink.css",
                                        "src/styles.css",
                                        "src/theme.scss"
                                    ],
                                }
                            }
                        }
                    }
                ```
        * With SCSS, we can define variables, so we can reuse values (like hexadecimal colour codes) in multiple places.
        * SCSS also offers us 'mixins' - which are a collection of multiple attributes. This is useful when we have a few attributes common across multiple css selectors and so avoids duplication. 
            * example:
                ```scss
                    /* theme.scss */
                    @import "another.scss";

                    $primary: #2f6dc9;

                    @mixin soft-border($border-radius) {
                        border: 1px solid #ccc;
                        border-radius: $border-radius;
                        padding: 10px;
                    }

                    .box {
                        @include soft-border(5px);
                    }

                    .box {
                        @include soft-border(10px);
                        color: $primary;
                    }
                ```
    * Creating a Custom Theme
        * First, we import the Angular Materials stylesheet into ```theme.scss``` - this comes with useful colour variables, mixins and other functions.
        * We also ```@include mat-core();``` mixin to get the consistent look and feel of angular material components.
        * Next, we defined our colour variables using a palet object generator function.
        * Finally, we create our theme using the light/dark theme function and add this to the ```angular-material-theme``` mixin.
            * Note, to change the background colour, we need to apply ```class="mat-app-background"``` to the ```<body>``` element in ```index.html```.
         * example:
            ```scss
                // theme.scss
                @import "~@angular/material/_theming";

                @include mat-core();

                $app-primary: mat-palette($mat-blue, 600);
                $app-accent: mat-palette($mat-yellow, 700);
                $app-warn: mat-palette($mat-red);

                $app-theme: mat-dark-theme($app-primary, $app-accent, $app-warn);

                @include angular-material-theme($app-theme);
            ```
            ```html
                <!-- index.html -->
                ...
                <body class="mat-typography mat-app-background">
                    <app-root></app-root>
                </body>
            ```
* Angular Material Typography
    * Angular Materials Typography gives us an easy way to define a consistently styled look and feel for the text across our application (colour, size, white-space, etc). 
    * To make use of Angular Material Typography, we can use the [guide](https://material.angular.io/guide/typography) in the docs.
        * Import the 'Roboto' type-face from Google fonts into global stylesheet (```styles.css```).
        * Use one of the in-built CSS class names on a template element (```mat-*```).
        * example:
            ```html
                <!-- app.component.html -->
                <h1 class="mat-headline">Angular Materials</h1>
                <p class="mat-body-1">...</p>
            ```
    * By using the ```mat-typography``` class in ```index.html```, we automatically apply the right Angular Material Typography class names to the corresponding elements. So can do away with the class names on individual elements.
        * example:
            ```html
                <!-- index.html -->
                ...
                <body class="mat-typography mat-app-background">
                    <app-root></app-root>
                </body>

                <!-- app.component.html -->
                <h1>Angular Materials</h1>
                <p>...</p>
            ```
* Customising Typography
    * We can change the font in our application's theme by importing the font into ```styles.css``` and then defining a new typography in ```theme.scss```.
        * With this, we can also configure the styles for each of the 'typography levels'; such as ```mat-title```, ```mat-body-1```, etc.
    * example:
        ```scss
            // styles.css
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
            ...

            // theme.scss
            @import "~@angular/material/_theming";

            @include mat-core();

            // Define Custom Theme
            ...

            // Define Custom Typography
            $app-typography: mat-typography-config(
                $font-family: '"Open Sans", "Helvetica Neue", sans-serif',
                $headline: mat-typography-level(48px, 32px, 800)
            );

            @include angular-material-typography($app-typography);
        ```