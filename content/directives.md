## Directives
* Directives are used to modify the DOM
    * There are two types:
        * Structural: modify the structure of the DOM
            * ```ngIf``` - conditionally adds / removes elements from template
            * ```ngSwitch``` - used to switch between alternate views
            * ```ngFor``` - renders a list of objects
        * Attribute: modify attributes of a DOM element
            * ```ngClass``` - adds / removes a set of CSS classes
            * ```ngStyle``` - adds / removes a set of HTML styles
            * ```ngModel``` - adds two way binding to an HTML form element
    * In-built Directives in the [docs](https://angular.io/guide/built-in-directives)
    * The Leading Asterisk
        * The ```*directiveName``` syntax is used to instruct Angular to wrap our markup inside ```<ng-template>``` tags. In essense the '```*```' is HTML shorthand that defines our structural directives in a condensed format; at compile time, Angular expands them and finishes it off for us.
            * See this part of the [docs](https://angular.io/guide/structural-directives#asterisk) for more info.
* ngIf
    * ```ngIf``` is used to show or hide elements based on a certain condition.
        * example:
            ```javascript
                // app.component.html
                <div *ngIf="courses.length > 0; then coursesList else noCourses"></div>
                <ng-template #coursesList>
                    List of Courses
                </ng-template>
                <ng-template #noCourses>
                    No Courses Yet
                </ng-template>

                // app.component.ts
                courses = ['courses1', 'courses2'];

                // this will render
                List of Courses

                // for example, see ../exercises/exercise-like-component/my-soln

            ```
    * We can also use the ```hidden``` attribute to hide elements on a screen; this can be made dynamic by using Property Binding.
        * The main difference between using ```hidden``` and ```ngIf``` is that with ```hidden```, the element is still added to the DOM - it is just not rendered on the screen for the user. With ```ngIf```, the actual DOM's structure is altered (```ngIf``` is a structural directive) - elements that have ```ngIf``` evaluated as ```falsy``` are removed from the DOMs.
            * Great stack overflow articles
                * [dipslay: none](https://stackoverflow.com/questions/67210340/displaynone-and-dom)
                * [angular: hidden vs ngIf](https://stackoverflow.com/questions/43034758/what-is-the-difference-between-ngif-and-hidden)
    * For large element trees, it makes sense to use ```ngIf```, as we avoid adding large chunks of redundant HTML to our DOM - speeds up loading time. Plus avoids Angular still applying the 'Change Detection Mechanism' to elements that aren't even in use.
        * There is an exception. When you have a large element tree, it still makes sense to use ```hidden``` over ```ngIf```, if it is costly to actually build the element tree on demand - think of a toggle button that triggers a complex element tree to be rendered, it could be more performant to use ```hidden```.
    * Either can be used for small element trees, as the performance differences are neglible - it makes sense to use ```hidden``` in this case because it uses less lines of code - have a play around... 
        * example
            ```javascript
                <div [hidden]="courses.length == 0"> List of Courses </div>
                <div [hidden]="courses.length > 0"> No Courses Yet </div>
            ```
* ngSwitch
    * ```ngSwitch``` is much like ```ngIf``` and the two can be used interchangeably in a lot of cases - however, with ```ngIf``` you can only have two conditions (```truthy``` and ```falsy```), ```ngSwitchCase``` is required when we have more to consider.
    * We use property binding to bind ```ngSwitch``` to a field in our class. Then we use the ```*ngSwitchCase="'<CASE>'"``` structural directive on the elements when want to conditionally show/hide. Beware the single quote inside double quotes here (```"' '"```) - we are taking the variable name as a string for the ```<CASE>``` variable.
    * example
        ```javascript
            // app.component.html
            <ul class="nav nav-pills">
                <li [class.active]="viewMode == 'map'"><a (click)="viewMode = 'map'">Map View</a></li>
                <li [class.active]="viewMode == 'list'"><a (click)="viewMode = 'list'">List View</a></li>
            </ul>
            <div [ngSwitch]="viewMode">
                <div *ngSwitchCase="'map'">Map View Content</div>
                <div *ngSwitchCase="'list'">List View Content</div>
                <div *ngSwitchDefault>Default View Content</div>
            </div>

            // app.component.ts
            viewMode = '';
        ```
* ngFor
    * ```ngFor``` is used to render a list of objects
        * the actual name is ```ngForOf``` by we reference it with ```ngFor```
    * It also exports a few values that can help you add certain features - such as adding a index or highlighting rows in a table.
        * These 'local variables' are in the [docs](https://angular.io/api/common/NgForOf#local-variables)
    * Change Detection
        * ```ngFor``` will react to changes in the component state by automatically updating the state of the DOM - if we add or remove objects from the list that we are iterating over, the changes will be automatically applied to the screen.
            * This is Angular's Change Detection Mechanism and applies for DOM events, timers and AJAX requests.
            
            <br>
            <img src='../resources/change_detection.png' alt='Change Detection' width='500'>
            
            <br>
    * Track By
        * There is a mechanism in Angular that tracks objects that have been added to the DOM. This is done to optimise performance and prevent reloading the same objects multiple times.
        * To do this with ```ngFor``` we supply a method name to the ```trackBy``` attribute; note that we don't call the method (using ```methodName()```), this is just a reference to a method in our controller (not a invocation of it).
        * There is no need to use ```trackBy``` by default, as there is likely to be no performance difference between rendering the list again. However, if you have a large list of objects or complex markup, use it to optimise performance.
    * example
        ```javascript
            // app.component.html
            <h2> Courses2</h2>
            <button (click)="loadCourses()">Load Courses</button>
            <ul>
            <li 
                *ngFor="let course of courses2; index as i; even as isEven; trackBy trackCourse" 
                [style.backgroundColor]="isEven ? '#ddd' : '#ccc'"
            >
                {{ i + 1 }}: {{ course.name }}
                <button (click)="onRemove(course)">Remove</button>
            </li>
            </ul>
            <button (click)="onAdd()">Add</button>

            // app.component.ts
            courses2: any;

            onAdd() {
                this.courses2.push(
                { id: this.courses2.length, name: "course" + (this.courses2.length + 1) }
                );
            }

            onRemove(course: any) {
                let index = this.courses2.indexOf(course);
                this.courses2.splice(index, 1);
            }

            loadCourses() {
                this.courses2 = [
                { id: 1, name: "course1"},
                { id: 2, name: "course2"},
                { id: 3, name: "course3"},
                ]
            }

            trackCourse(index: number, course: any) { 
                return course ? course.id : undefined;
            } 
            // now instead of tracking objects by their angular ID
                // we track them by the course.id field
        ```
* ngClass
    * We can use class binding to bind properties of our component to classes in our template. If we have multiple classes available for the same component property we have to repeat the class binding multiple times - ```ngClass``` helps to solve this problem by using key-value pairs:
        * ```[ngClass]="{'className0': componentPropery0, 'className1': componentPropery1}"```
    * ```ngClass``` is an attribute direction (not structural) - it is used to modify the attributes of an existing DOM element; not to affect the structure of the DOM itself.
    * example
        ```javascript
            <span
                class="glyphicon"
                [ngClass]="{'glyphicon-star': isFavorite, 'glyphicon-star-empty': !isFavorite}"
                (click)="onClick()"
            ></span>

            // see ../exercises/exercise-favourite-component/mosh-sol
        ```
* ngStyle
    * The ```ngStyle``` directive is used to clean up our code when we have multiple style bindings.
        * Like with ```ngClass```, we can condense mutliple bindings into a single key-value mapping.
    * Note, however, it is best practise to encapsulate multiple CSS properties inside a CSS class and vary that class - instead of relying on inline CSS.
    * example
        ```javascript
            // app.component.html
            <button
                [style.backgroundColor]="canSave ? 'blue' : 'grey'"
                [style.color]="canSave ? 'white' : 'black'"
                [style.fontWeight]="canSave ? 'bold' : 'normal'"
                (click)="canSave = !canSave"
            >
                Save
            </button> <!-- without ngStyle -->
            <button
                [ngStyle]="{
                    'backgroundColor': canSave ? 'blue' : 'grey',
                    'color': canSave ? 'white' : 'black',
                    'fontWeight': canSave ? 'bold' : 'normal'
                }"
                (click)="canSave = !canSave"
            >
            Save
            </button> <!-- with ngStyle -->

            // app.component.ts
            canSave = true;

            // see ../exercises/exercise-like-component/my-sol
        ```
* Safe Traversal Operator
    * Sometimes, when working with complex objects, a property may be undefined or null for a period of time; we use the Safe Traversal Operator (```?```) to ensure Angular expects this possibility and avoid errors being thrown in the console.
        * This is more likely when we are fetching object data from a backend service.
    * If ```?``` is used and the value is ```null```/```undefined```, Angular will render an empty HTML element.
    * example
        ```javascript
            // app.component.html
            <span>{{ task.assignee?.name }}</span>

            // app.component.ts
            task = {
                title: 'Review applications',
                assignee: {
                name: "John Smith"
                }
            }

            // see ../exercises/exercise-like-component/my-sol
        ```
        * if ```this.task.assignee``` becomes ```null```/```undefined```, an empty ```<span>```
* Creating Custom Directives
    * We can create our own custom directives using the Angular CLI:
        * ```ng g directive <DIRECTIVE_NAME>```
    * example: 
        * see ```../exercises/exercise-like-component/my-sol```
            * ```ng g directive input-format```
            ```javascript
            // app.component.html
            <input type="text" placeholder="Enter name" appInputFormat [format]="'lowercase'">
            <br>
            <input type="text" placeholder="Enter name" appInputFormat [format]="'uppercase'">

            // input-format.directive.ts
            @Directive({
                selector: '[appInputFormat]'
            })
            export class InputFormatDirective {

                constructor(private el: ElementRef) { }

                @Input('format') format = 'lowercase';

                @HostListener('blur') onBlur() {
                    let value: string = this.el.nativeElement.value;

                    if(this.format == 'lowercase') 
                    this.el.nativeElement.value = value.toLowerCase();
                    else if(this.format == 'uppercase')
                    this.el.nativeElement.value = value.toUpperCase();
                }
            }
            ```
* Zippy Component Exercise
    * see ```../exercises/exercise-zippy-component/my-soln``` for my initial solution
    * see ~~```../exercises/exercise-zippy-component/mosh-soln```~~ for Mosh's better solution
        * our solutions were too similar to warrant creating a separate project
        * notes:
            * the only notable difference was Mosh named his classes a bit better than mine - use of a ```zippy``` hierachy with ```zippy-heading``` and ```zippy-body```; apart from that my solution matched his.