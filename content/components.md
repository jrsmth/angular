## Building Reuseable Components
* Property binding doesn't work by default for custom components - you need to define an Input Property to do this.
    * example: this doesn't work by default - ```<favourite [isFavourite]="isFavourite"></favourite>```, despite the fact that ```isFavourite``` is a property of the ```<favourite>``` component.
        * ```Can't bind to 'isFavourite' since it isn't a known property of 'favorite'```
    * Property Binding Syntax Reminder:
        * ``` <DOM_OBJECT [DOM_PROPERTY]="COMPONENT_PROPERTY"></DOM_OBJECT> ```
            * Property Binding is where we bind fields/properties of our component to properties of a DOM object - state flows from the component to the DOM; not from the DOM to Component (to do this you need Two-way Binding ```[()]```)
* To make a component more usable, we need to add Input and Output Properties - state comes into the component through Input Properties and events comes out of the component through Output Properties. The combination of this is referred to as the Public Component API.
    ```html
        <favorite [isFavourite]="post.isFavorite" (change)="onFavoriteChange()"></favorite>

        <!-- [isFavorite]="post.isFavourite": Property Binding requires Input Property --> 
        <!-- (change)="onFavoriteChange()": Event Binding requires Output Property -->

        // note this example is in ../exercises/exercise-favourite-component/mosh-soln>
    ```
    <br>
    <img src='../resources/component_api.png' alt='Component API' width='500'>
    
    <br>
* Input Properties
    * There are two ways to mark a component field as an Input Property
        * one: using the ```@Input()``` Decorator (annotation in Spring) directly on the field in the component
        * two: specify the field as an Input Property in the Component metadata - ```@Component({ ..., inputs: [<FIELD_NAME>, ...] })```
            * ```two``` appears to be a better approach at first but it duplicates your code; changes made to the field name will break this Input Property - therefore use approach ```one```.
    * You can give an Input Property an alias/nickname by optionally supplying a string parameter to the  ```@Input()``` Decorator.
        * We would do this to avoid using camelCasing in our HTML template - for clarity. It also keeps the contract of the component stable should we go about changing the component field name.
        * example:
            * ```<favorite [is-favorite]="post.isFavorite"></favorite>```
            * ```@Input('is-favorite') isFavorite = false;```
            * remember that you still need to use ```isFavorite``` in the ```favorite.component.html```.
* Output Properties
    * We can define Output Properties using the ```Output()``` Decorator on a field that is set to an EventEmitter: 
        * example: ```@Output() change = new EventEmitter();```
        * We need to emit this event somewhere and can do this using: ```this.change.emit(value?: T);```
            * We pass event data using this ```value``` parameter so that all subscribers to the event receive the data when the event is raised.
    * We can also alias Output Properties using the the same method as Input Property aliases - alias help out contract stable if we change the name of our fields.
    * example:
        ```javascript
            // app.component.ts
            import { FavoriteChangedEventArgs } from './favorite/favorite.component';
            ...
            export class AppComponent {
                ...
                onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
                    console.log('onFavoriteChange from AppComponent', eventArgs);
                }
            }

            // app.component.html
            <favorite [is-favorite]="post.isFavorite" (change)="onFavoriteChanged($event)"></favorite>

            // favorite.component.ts
            export class FavoriteComponent implements OnInit {
                ...
                @Output('change') change = new EventEmitter();

                ...
                onClick() {
                    let message = '<favorite> clicked from FavoriteComponent';
                    console.log(message);
                    this.isFavorite = !this.isFavorite;
                    this.change.emit({message: message, isFavorite: this.isFavorite});
                }
            }

            export interface FavoriteChangedEventArgs {
                message: string,
                isFavorite: boolean
            }

            // favorite.component.html
            <span .... (click)="onClick()"></span>
        ```
* Templates
    * There are two ways to add HTML templates to our Component
        * one: using inline HTML in the component metadata - ```@Component({ ..., template: '<h1> Hello World </h1>' })```.
        * two: providing a reference to a ```<COMPONENT_NAME>.component.html``` template file in the component metadata - ```@Component({ ..., templateUrl: './<COMPONENT_NAME>.component.html' })```.
        * method ```two``` is preferable from ```one``` as it decouples your HTML from your TypeScript and is much cleaner. 
            * You cannot combine the two approaches or provide more than one template file.
    * Templates are bundled into ```main.bundle.js```.
* Styles
    * There are three ways to add styles into our Component.
        * one: using inline CSS in the component metadata - ```@Component({ ..., styles: ['h1 { color: red; }'] })```.
        * two: provide a reference to a ```<COMPONENT_NAME>.component.css``` stylesheet in the component metadata - ```@Component({ ..., styleUrls: ['./<COMPONENT_NAME>.component.css'] })``` 
            * using this method, you can add multiple css files
        * three: write inline CSS in our HTML template - using ```<style><style>``` or ```style=''``` on an individual element.
            * method ```two``` is preferable as it decouples your CSS from both the TypeScript and the HTML.
* View Encapsulation
    * The Shadow DOM
        * Shadow DOM allows hidden DOM trees to be attached to elements in the regular DOM tree — this shadow DOM tree starts with a shadow root, underneath which can be attached to any elements you want, in the same way as the normal DOM.

        <br>
        <img src='../resources/virtual_vs_shadow_dom.png' alt='Shadow DOM' width='500'>
        
        <br>

        * For Angular, the Shadow DOM allows us to encapsulate a component's styles and scope them to this component only - preventing them from bleeding out to other components.
            * example:
                ```javascript
                    var el = document.querySelector('favorite');

                    el.innerHTML = `
                        <style> h1 { color: red; } </style>
                        <h1> Hello World </h1>
                    `;
                ```
                * The issue with this example, is if we add another ```<h1>``` somewhere else in the DOM, it will also inherit the ```red``` styling. We want to confine this style to just this section of code and so need to create a Shadow DOM to encapsulate this scope.
                    * example:
                        ```javascript
                            var el = document.querySelector('favorite');
                            var root = el.createShadowRoot();

                            root.innerHTML = `
                                <style> h1 { color: red; } </style>
                                <h1> Hello World </h1>
                            `;
                        ```
                        * Now the ```red``` styling for ```<h1>```'s only applies to this section of code.
        * In Angular, the concept of the Shadow DOM is emulated by default - although you can change this behaviour with the ```encapsulation``` property of the ```@Component({ })``` metadata. The process by which we encapsulate a component's styling by using the shadow DOM is called View Encapsulation.
    * ngContent
        * ngContent is used when we want the consumer of a component to inject data into it. 
        * We use ```<ng-content selector="<VALID_CSS_SELECTOR>"></ng-content>``` in our component markup and this gets replaced by a value provided by the consumer of the component.
        * example:
            ```javascript
                // panel.component.html (component to be consumed)
                <div class="panel panel-default">
                    <div class="panel-heading"> 
                        <ng-content select=".heading"></ng-content>
                    </div>
                    <div class="panel-body"> 
                        <ng-content select=".body"></ng-content>
                    </div>
                </div>

                // app.component.html (consumer of the component)
                <bootstrap-panel>
                    <div class="heading"> Heading </div>
                    <div class="body">
                        <h3> Body </h3>
                        <p> Lorem ipsum dolor set </p>
                    </div>
                </bootstrap-panel>
            ```
            * note: 
                * if only one ```<ng-content>``` exists in your component, you don't need to use a ```select``` property.
* ngContainer
    * ngContainer works in conjunction with ngContent to provide only the innerHTML of the element that we pass into our component. 
    * In the previous example, our ```<ng-content select='.header'>``` was replaced with ```<div class="heading"> Heading </div>```; which is fine but creates extra noise due to the redundant ```.heading``` div. 
        * ngContainer solves this problem by replacing the ```<ng-content select='.header'>``` with ```Heading``` only - good practise to use it.
            * example:
                ```javascript
                    // panel.component.html (component to be consumed)
                        // see ngContent example, above

                    // app.component.html (consumer of the component)
                    <bootstrap-panel>
                        <ng-container class="heading"> Heading </ng-container>
                        <ng-container class="body">
                            <h3> Body </h3>
                            <p> Lorem ipsum dolor set </p>
                        </ng-container>
                    </bootstrap-panel>
                ```
* Like Component Exercise
    * see ```../exercises/exercise-like-component/my-soln``` for my initial solution
    * ~~see ```../exercises/exercise-like-component/mosh-soln``` for Mosh's better solution~~
        * our solutions were too similar to warrant creating a separate project
        * notes:
            * Install an older version of bootstrap with npm by using the following: ```npm i bootstrap@3.3.7 --save```
            * Input Properties (declared with ```@Input()```) are implied to be public, so don't bother with getters and setters
                * see [this](https://stackoverflow.com/questions/38469396/should-angular2-inputs-be-public-or-can-should-we-have-a-stricter-api-by-making) stack overflow
                * Decorate ```@Input()```/```@Output()``` on the same line as the field, improves readability; separating them on two lines (like in Spring) doesn't do much.