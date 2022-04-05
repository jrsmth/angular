## Animations
* There are two ways to animate DOM elements
    1. CSS
        * using either custom CSS properties or by using the ```animate.css``` library.
            * https://animate.style/
            * Excellent resource for CSS animations: 
                * https://animista.net/play/basic
        * This approach is suitable for one-off, short-lived simple animations - such as: toggling UI component states or showing a 'tool tip'.
    2. JavaScript
        * We use JS when we need to build richer, more complex animations that require finer control.
        * There are a few animation JS libaries out there (such as JQuery)
            * The Web Animations API (WAAPI) is JavaScripts native API for performing animations
                * Good [article](https://css-tricks.com/css-animations-vs-web-animations-api/) comparing WAAPI with CSS animations.
* In Angular, there is a ```@angular/animations``` module that builds on top of the Web Animations API.
    * This abstraction makes it easier to unit test and port to other platforms (think mobile).
* An 'animation' is a transition from one state of a DOM element to another. 

    <br>
    <img src="../resources/animation_defn.png" alt="Animation Definition" width="500">

    <br>

    * There are 3 states that an element can have:
        * Void
            * where an element is not part of the DOM; typically when an element has been created but not added to the DOM, or when it has been removed from the DOM.
        * Default (```*```)
        * Custom
* Implementing Animations
    * In the component's metadata (```@Component{ }```), there is an optional ```animations``` field that we can supply with an array of 'triggers' - which is a name and an implementation. We can then reference that trigger in our template by using ```@<TRIGGER_NAME>```.
        * example:
            ```typescript
                @Component({
                    animations: [
                        trigger('fadeIn', [
                            state(...),
                            transition(...)
                        ])
                    ]
                })
            ```
            ```html
                <div @fadeIn></div>
            ```
* For this section, my examples can be found in ```../exercises/exercise-animations/examples```.
    * Notes:
        * remember to import ```BrowserAnimationsModule``` into ```app.module.ts``` from ```@angular/platform-browser/animations```
        * Angular animations are built upon the Web Animations API, which varies in its support across the browsers - to plug the gaps in the less supported browsers (like Safari), we use 'Polyfills'.
            * A Polyfill is a piece of code that allows you run new JavaScript features in old browsers - that wouldn't natively support them.
                * There is a ```src/polyfills.ts``` file that lets you 'comment in' the bits you need.
* Implementing Fade In and Out
    * example:
        ```html
            <!-- todos.component.html -->
            <div *ngIf="items" class="list-group" >
                <button type="button"
                    @fade
                    *ngFor="let item of items"
                    (click)="removeItem(item)"
                    class="list-group-item">
                    {{ item }}
                </button>
            </div> 
        ```
        ```typescript
            // todos.component.ts
            @Component({
                selector: 'todos',
                templateUrl: './todos.component.html',
                styleUrls: ['./todos.component.css'],
                animations: [
                    trigger('fade', [
                    // fade in
                    transition("void => *", [
                        style({ backgroundColor: 'yellow', opacity: 0}), // applies the style immeadiately
                        // animate(2000, style({ backgroundColor: 'white', opacity: 1})) // applies the style over a period
                        animate(1000) 
                        // animate() w/o a style() arg undoes the style() object set on the line above
                        // returns it to the default state
                    ]),
                    // fade out
                    transition("* => void", [
                        animate(250, style({ opacity: 0 })) 
                    ])
                    ])
                ]
            })
        ```
* state()
    * The ```state()``` function is used to make our code cleaner and more maintainable; by allowing us to define the styling of an element for a particular element state (void, default (```*```), custom).
        * Typically, we only need to define the ```transition()``` but using ```state()``` can help remove duplicate code from the implementation.
        * example
            ```typescript
                // todos.component.ts - BEFORE, without state()
                 @Component({
                    ...,
                    animations: [
                        trigger('fade', [
                            // fade in
                            transition("void => *", [
                                style({ opacity: 0}), 
                                animate(2000)
                            ]),
                            // fade out
                            transition("* => void", [
                                animate(2000, style({ opacity: 0 })) 
                            ])
                        ])
                    ]
                })

                // todos.component.ts - AFTER, with state()
                @Component({
                    ...,
                    animations: [
                        trigger('fade', [
                            state('void', style({ opacity: 0 })),
                            
                            // fade in
                            transition("void => *", [
                                animate(1000) 
                            ]),
                            // fade out
                            transition("* => void", [
                                animate(250) 
                            ])
                        ])
                    ]
                })
            ```
* Transition refactoring
    * We can make our transition implementation even cleaner. 
    * When you have multiple transitions, with the same implementation, you can combine them into the same transition statement.
        * example:
            ```typescript
                // todos.component.ts - BEFORE
                @Component({
                    ...,
                    animations: [
                        trigger('fade', [
                            state('void', style({ opacity: 0 })),
                            
                            // fade in
                            transition("void => *", [
                                animate(1000) 
                            ]),
                            // fade out
                            transition("* => void", [
                                animate(1000) 
                            ])
                        ])
                    ]
                })

                // todos.component.ts - NEATER
                @Component({
                    ...,
                    animations: [
                        trigger('fade', [
                            state('void', style({ opacity: 0 })),
                            
                            // fade in/out
                            transition("void => *, * => void", [
                                animate(1000) 
                            ])
                        ])
                    ]
                })

                // todos.component.ts - EVEN NEATER
                @Component({
                    ...,
                    animations: [
                        trigger('fade', [
                            state('void', style({ opacity: 0 })),
                            
                            // fade in/out
                            transition("void <=> *", [
                                animate(1000) 
                        ])
                    ]
                })
            ```
            * There also exists aliases:
                * ```"void => *"```: ```:enter```
                * ```"* => void"```: ```:leave```
* Creating Reusable Triggers
    * We can create a ```src/app/animations.ts``` file to define our animations so that we can access them globally across the application.