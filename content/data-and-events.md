## Displaying Data & Handling Events
* Property Binding
    * Property Binding is when we bind a property of our DOM element (ex: ```<img src="">```) to a field in our component (ex: ```private _imageUrl: string```) - String Interpolation is a syntactical sugar that makes Port Binding easier to read.
    * String Interpolation is converted into Property Binding when we run our templates.
        * String Interpolation: ``` <h2> {{ title }} </h2> ```
            * gets converted into Port Binding: ```<h2 [textContent]="title"></h2>```
                * String Interpolation is less noisy but sometimes using the Property Binding syntax is preferable: ```<img src="{{ imageUrl }}>``` vs ```<img [src]="imageUrl">``` - Port Binding is nicer here.
    * Port Binding works one way: the DOM elements will change when any changes to the component field are made; however, the reverse is not true - changes to the DOM element are not reflected back to the component field. 
* Attribute Binding
    * The DOM (Document Object Model) is a tree of objects in memory.
    * HTML is the language that our page is written in; we when run our HTML file, the HTML is converted into a DOM.
        * The DOM can also be created programmatically with JS.
    * Most of the HTML element attributes have a 1-1 relationship with properties of DOM objects.

        <br>
        <img src='../resources/html_vs_dom.png' alt='HTML into DOM' width='500'>
        
        <br>

        * There are a few exceptions, however - such as the ```colspan``` attribute of ```<td>```, there exists no DOM equivalent. The reverse is also true: there exists a ```textContent``` property as part of ```h1``` in the DOM but there is no such attribute in HTML.
        * It is important to remember that with Property Binding we are binding component fields to a property of the DOM, not attributes of an HTML element.
        * If we want to bind a component field to an attribute that doesn't exist as a DOM property (like ```<td>```'s ```textContent```), we have to use the following syntax:
            * ```javascript
                <table>
                    <tr>
                        <td [attr.colspan]="colspan"> </td>
                    </tr>
                </table>
              ```
                * not simply: ```[colspan]="colspan"```
* Bootstrap:
    * A CSS library that can be used to rapidly create web apps with a modern look and feel
        * https://getbootstrap.com/
    * Install: ```npm i bootstrap --save```
    * Add ```@import "~bootstrap/dist/css/bootstrap.css";``` to ```/src/styles.css```
        * In this file we hold the styles that are globally accessible across our application.  
    * Reference bootstrap in the desired component HTML
        * example: ```<button class="btn btn-primary"></button>```
* Class Binding
    * In certain situations we may wish to add particular classes to an element if certain conditions are met - we use Class Binding for this (a variation of Property Binding).
        * example: we may wish for an element to be ```active``` when clicked on; we can assign it ```class='active'``` and utilise the CSS styling in ```.active {}```.
            * To do this in Angular, we property bind a field (condition) in our component to the template.
                * example: 
                    * in ```courses.component.html```: 
                        * ```javascript
                            <button class="btn btn-primary" [class.active]="isActive"> Save </button>
                          ```
                    * in ```courses.component.ts```:
                        * ```javascript
                            private _isActive: boolean;
                            ...
                            get isActive() {
                                return this._isActive;
                            }
                          ```
                    * When ```isActive``` evaluates to ```true```, the class ```active``` will be applied to the button; when it is ```false``` (not true?) it will be removed.
* Style Binding
    * With Style Binding we an choose to apply particular inline CSS styling to elements based on a condition.
        * full list of properties to configure: 
            * https://www.w3schools.com/jsref/dom_obj_style.asp
    * example:
        * ``` <button class="btn" [style.backgroundColor]="isActive ? 'pink' : 'white'"> Click Me </button> ```
            * ```isActive``` is a public boolean property in our component
* Event Binding
    * Used to handled events from the DOM - such as keystrokes, mouse movements, clicks, etc.
        * DOM Events:
            * https://www.w3schools.com/jsref/dom_obj_event.asp
            * You can add custom events with ```EventEmitter```.
    * We bind a named event to a method in our component.
    * Event Bubbling
        * Events from the DOM will bubble/propagate up the DOM tree.
        * example: a ```<button>``` and ```<div>``` both handle the ```click``` event  but bind them to different methods in the component. If ```<div>``` wraps the ```<button>```, on the ```click``` of the ```<button>```, both elements will trigger their bound methods as the ```<button>``` event bubbles up to the ```<div>``` and beyond.
        * We can prevent Event Bubbling by calling this method in the last method that we want the event to propagate to: ``` $event.stopPropagation(); ```
    * example:
        ```javascript
            export class CoursesComponent{
                ...

                save($event: Event){
                    $event.stopPropagation(); // prevent Event Bubbling
                    console.log('Button was clicked', $event);
                }

                onDivClick($event: Event){
                    console.log('Div was clicked');
                }

            }
        ```
        ```javascript
            // courses.component.html
            <div (click)="onDivClick($event)">
                <button class="btn btn-secondary" (click)="save($event)"> No, Click Me </button>
            </div>

        ```
* Event Filtering
    * This is used in association with the ```(keyup)``` event; this event handler hears every keystroke and then traditionally it was up to the programmer to write custom logic to determine which key was being pressed (ex: ```if($event.keyCode === 13) {console.log("ENTER was pressed);}```). With Event Filtering, Angular will handle this for us:
        * example:
            * old: ``` <input (keyup)="onKeyPressed($event)"> ```
                * determine if keycode is 13 in ```onKeyPressed()``` method
            * new (Event Filtering): ``` <input (keyup.enter)="onEnterPressed()"> ```
* Template Variables
    * With ```<input>``` fields, we can extract the user input using the following:
        * in our component (that has a the method bound to an event):
            * ```$event.target.value```
    * There is a better way to do this in Angular, using Template Variables.
        * ```javascript
            <input #email placeholder="Enter Email" />
            <button (click)="submitEmail(email.value)">Submit Email</button> <!-- you can use template variables across the DOM -->
          ```
        * ```javascript
            submitEmail(email: string){
                console.log(email);
            }
          ```
* Two-Way Binding
    * Two-Way Binding allows us to achieve better object-oriented design by passing objects around from user input, instead of simple parameters (like with Template Variables).
    * To do this, we bind the Property of a DOM object to a field in our component.
        * We use the ```ngModel``` directive (a directive manipulates the DOM) to achieve two-way binding, by binding our component field to this property.
            * We use 'bannana in a box' syntax for this: ``` [(ngModel)] ```
            * To use ```ngModel``` or build any kind of form, we have to import the ```FormsModule``` into ```app.module.ts```.
            ```javascript
                @NgModule({
                declarations: [
                    ...
                ],
                imports: [
                    ...,
                    FormsModule
                ],
                providers: [...],
                bootstrap: [...]
                })
            ```
        * example:
            * ``` <input [(ngModel)]="address" (keyup.enter)="submitAddress()" placeholder="Enter Address & Press Enter" /> ```
* Pipes
    * Pipes are used to format data
        * [Docs](https://angular.io/guide/pipes) on using Pipes.
    * There are a number of inbuilt Pipes:
        * Uppercase (```uppercase```)
        * Lowercase (```lowercase```)
        * Percent
            * formatted in similar way to ```number```
        * Decimal (```number```)
            * Although the class is called ```Decimal```, we refer to it using ```number```.
            * Decimal will add ```,```'s for every 3 digits for digits before the decimal place.
            * We can control the number of digits before the decimal place and afterwards
                * ```number:'numDigitsBefore.minNumDigitsAfter-maxNumDigitsAfter'```
                    * configuring these values will round the values up and down.
                * example: 
                    * ```{{ 4.9747 | number:'1.2-2' }}``` gives ```4.97```
                    * ```{{ 4.9747 | number:'2.1-1' }}``` gives ```05.0```
        * Currency (```currency```)
            * ```{{ 190.95 | currency }}``` defaults to ```USD190.95```
            * We can control the currency type, symbol used and digit formatting (in a similar way to Decimal/```number```).
                * example: 
                    * ```{{ 190.95 | currency:'AUD' }}``` gives ```AUD190.95```
                    * ```{{ 190.95 | currency:'AUD':true:'1.1-1' }}``` gives ```A$191.0```
                        * should ```numDigitsBefore``` be less than the actual/original number of digits before the decimal place, the presented number of digits before the decimal place will be the original amount - i.e ```190.95 | number/currency:'1:1-1'``` is ```191.0``` not ```200.0```.
        * Date (```date```)
            * look at the [DatePipe Docs](https://angular.io/api/common/DatePipes) for formatting options.
    * Pipes can be chained togther to combine their functionality.
    * Example use:
        ```javascript
            // courses.component.ts
            export class CoursesComponent{
                private _dummyCourse = {
                    title: "The Complete Angular Course",
                    rating: 4.9745,
                    students: 301023,
                    price: 14.99,
                    releaseDate: new Date(2016, 3, 1)
                };

                ...

                get dummyCourse() {
                    return this._dummyCourse;
                }
            }

            // courses.component.html
            ...
            <p> {{ dummyCourse.title | uppercase | lowercase }} </p>
            <p> {{ dummyCourse.students | number }} </p>
            <p> {{ dummyCourse.rating | number:'1.2-2' }} </p>
            <p> {{ dummyCourse.price | currency:'GBP':true:'3.2-2' }} </p>
            <p> {{ dummyCourse.releaseDate | date:'longDate' }} </p>
        ```
    * Custom Pipes
        * We can also create our own custom Pipes.
        * An example use for this might be a text (string) field in our component that is really long; perhaps on our view, we only want to display a ```summary``` of this text.
            * Step 1: Create ```/src/app/summary.pipe.ts```
            ```javascript
                @Pipe({
                    name: 'summary'
                })
                export class SummaryPipe implements PipeTransform {
                    transform(value: string, limit?: number) {
                        if(!value)
                            return null;
                        
                        let actualLimit = (limit) ? limit : 50;
                        return value.substring(0, actualLimit) + "...";
                    }
                    
                }
            ```
            * Step 2: Register it in ```src/app/app.module.ts```
            ```javascript
                @NgModule({
                    declarations: [
                        ...,
                        SummaryPipe
                    ],
                    imports: [
                        ...
                    ],
                    providers: [...],
                    bootstrap: [...]
                    })
            ```
            * Step 3: Use it in your component HTML template
            ```javascript
                <p> {{ dummyCourse.description | summary:100 }} </p>
                    // make sure there is a description field in your dummyCourse object
            ```
            * Of course, it is better practise to use the Angular CLI - a lot faster:
                * ```ng g pipe <PIPE_NAME>```
* Favourite Component Exercise
    * see ```../exercises/exercise-favourite-component/my-soln``` for my initial solution
    * see ```../exercises/exercise-favourite-component/mosh-soln``` for Mosh's better solution
        * notes:
            * I opted to use a ternary operator to toggle between solid and empty stars
                * to this I used the following resources:
                    * ```ngClass```: https://angular.io/api/common/NgClass
                    * [angular tenary operator stack overflow](https://stackoverflow.com/questions/35230541/can-ngclass-use-ternary-operator-in-angular-2)
                * Mosh's solution is slightly more verbose but I would argue is easier to read (nice formatting).
            * Bootstrap removed ```glyphicons``` in later versions, so I had to use a older version (^3.3.7 in ```package.json```)
                * glyphicons: https://getbootstrap.com/docs/3.3/components/#glyphicons-examples
                * I did experiment with font awesome but only solid icons are part of the free plan (regular, outline, icons are part of PRO).
* Title Casing Exercise
    * see ```../exercises/exercise-title-casing/my-soln``` for my initial solution
    * see ```../exercises/exercise-title-casing/mosh-soln``` for Mosh's better solution
        * notes:
            * Remember to import ```FormsModule``` into ```app.module.ts``` before using ```[(ngModel)]``` to achieve Two-way Binding.
            * see Mosh's soln for a better title-casing algorithm and all round cleaner formatting.