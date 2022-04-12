## Redux
*A Predictable State Container for JS Apps*
* What is Redux?
    * Redux is a library to help you manage the state of your application.
        * It is something that you should consider using you're working with a medium-to-large single page application with complex data flows.
            * In small/simple apps, using Redux would add unnecessary complexity.
                * We can always start without Redux and then as it grows in complexity, refactor it and add Redux later on.
        * Redux is a predictable state container for JS apps.
    * Large Single Page Apps
        * A component manages the logic and state behind a view (section of the screen). This model perfectly alligns with the OOP principle of encapsulation. However, this model doesn't work so well when multiple unrelated views are working with the same piece of data. 
            * In this case, we often have copies of the same data across each view and therefore have to do some extra work to sync the data in other views when we change a copy of the data in one view. You could use events to sync the view but this will grow to be too complex in a large application. It is also unpredictable and hard to maintain/extend.
                * Think of Facebook as an example. On the screen we have mulitple views that show you data related to messaging; let's say we are on the messages page, we'll have the number of unread message on the main section of the screen - plus it will also be part of the notifications in the nav bar and part of any open message tabs at the bottom of our screen. It is situations like this when we need to use Redux.
                    * Flux was an architecture that was design by Facebook; Redux is a lightweight implementation of this.
    * Redux Benefits:
        * Redux allows us to manage application state in a predictable way.
        * Redux has a decoupled architecture and so is independent of the presentation framework that we choose to use. This allows for one of Uncle Bob's clean architecture principles: delay the decision about external frameworks and libraries. We can choose to use either React or Angular, etc (no locked-in to one).
        * Redux also improves testability (relies heavily on Functional Programming concepts, avoids the need for mocks, spies, etc).
        * Great tooling - especially debugging.
        * Undo / redo features.
    * When to use Redux:
        * Scenarios:
            * Independent copies of the same data in multiple places
            * Multiple views that need to work with the same data and be in-sync
            * The same data can be updated by multiple users / actions
        * According to [this](https://www.stackchief.com/blog/Why%20you%20should%20NEVER%20use%20Redux%20with%20Angular) article, you should avoid using Redux with Angular. This is because it was design to solve problems in React and Angular doesn't need it. 
            * According to [this](https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/) Angular University blog, Redux is good to use with Angular.
* Building Blocks of Redux
    * There are three building blocks of Redux
        * Store
            * A single JS object that contains the state of the application; akin to a local, client-side database. Different views (components) use different parts / slices of the store and if they need to work on the same slice, it means there is only one copy of the data. Changes made by one component to the slice are visible to other components using that slice. We don't need to be concerned about using too much memory, unless we are storing 1000's of objects.
        * Actions
            * Plain JS objects that represent something that has happened in the application. Actions in Redux are symantically 'events' - in CQRS architecture (Command and Query Responsibility Segregation), 'commands' represent something that can happen (like posting a message), 'events' (Actions, in Redux) represent something that has already happened (like a message has been posted).
        * Reducers
            * A function that specifies how the state changes in response to an action. It can be thought of as an event/action handler that determines how we should change the state. A Reducer does not modify the state, it only returns a new state - the store will then internally update the state. No where in the application do we directly modify the state; that is the responsibility of the store.
* Pure Functions
    * A Function is said to be Pure if it meets the two conditions below; if so, it is analogous to a mathematical function - Good [reading](https://en.wikipedia.org/wiki/Pure_function)
        1. Given the same input, the function always returns the same output - regardless of how many times we call it.
            * A Pure Function should not mutate/modify any of its arguments; or use functions, such as Date.now() or Math.random(), which change each time the function is called.
        2. The function has no side effects. 
            * An example of this is making calls to a backend service.
    * Pure Functions are not equivalent to Idempotency - good Stack Overflow [post](https://stackoverflow.com/questions/4801282/are-idempotent-functions-the-same-as-pure-functions)

    <br>

    <img src="../resources/impure_func.png" alt="Impure Functions" width="500">
    
    <br>

    <img src="../resources/pure_func.png" alt="Pure Functions" width="500">
    
    <br>

    * Reducers as Pure Functions
        * Reducer functons in Redux are always pure. They take in the application state and an action; then based on the action type, the return a new state. 

        <br>

        <img src="../resources/reducer_ex.png" alt="Reducer Example" width="500">
        
        <br>

        * This is a Functional Programming approach and has a few benefits:
            * Easy to test
                * No mocks, spies or tricks required. Just a simple assertion about the output.
            * Easy undo/redo
                * We can support these features because we keep the previous state, instead of modifying it.
            * Time Travel Debugging
                * We can 'travel back in time' and check our application state, as different actions are triggered in the application. We can see how the application state is modified at each step.
* Installing Redux
    * My examples for this section can be found in ```../exercises/exercise-redux/examples```
    * Useful resources:
        * https://ngrx.io/guide/store

        <br>

        <img src="../resources/ngrx_lifecyle.png" alt="NGRX Lifecycle" width="500">
        
        <br>

    * Steps
        * Create an Angular app
            * ```ng new <APP_NAME>```
        * Install Redux
            * ```npm install @ngrx/store --save```
* Working with Actions
    * When using Redux, we don't modify the state of our application in the component. 
        * Instead we use an Action, which goes to the Store. The Store knows the right Reducer to call; in the Reducer a new state is returned, depending on the type of the Action. The Store uses this new state to update itself.

    <br>

    <img src="../resources/redux_dataflow.png" alt="Redux Dataflow" width="500">
    
    <br>

    * To make a change to the state of our app from our component, we inject a ```Store``` object into our component constructor. This ```Store``` object takes in the an interface for our store object - we can define this in ```store.ts```.
    * We dispatch Actions from methods on our component by using ```store.dispatch(<METHOD_CALL()>)```; with the ```<METHOD_CALL()>``` being defined in our ```*.actions.ts``` file - from here these Actions are used in the ```*.reducer.ts``` file to return a new state.
        * I used [this](https://ngrx.io/guide/store) guide as my example
    * example:

        ```html
            <!-- counter.component.html -->
            <p>Current Count: {{ count$ | async }}</p>
            <button 
                (click)="increment()"
                mat-raised-button color="primary">
                Increment
            </button>
            <button 
                (click)="decrement()"
                mat-raised-button color="accent">
                Decrement
            </button>
            <button 
                (click)="reset()"
                mat-raised-button color="warn">
                Reset
            </button>
        ```
        ```typescript
            // counter.component.ts
            ...
            export class CounterComponent {

                count$: Observable<number>;
                
                constructor(private store: Store<IAppState>) {
                    // Connect `this.count$` stream to the current store `count` state
                    this.count$ = store.select('count');
                }

                increment() {
                    // Dispatch an increment action
                    this.store.dispatch(increment());

                    // this.counter++; // typical Angular, without using Redux
                }

                decrement() {
                    // Dispatch an decrement action
                    this.store.dispatch(decrement());
                }
                
                reset() {
                    // Dispatch a reset action
                    this.store.dispatch(reset());
                }
            }

            // counter.actions.ts
            export const initialState = 0;

            export const counterReducer = createReducer(
                initialState,
                on(increment, (state) => state + 1),
                on(decrement, (state) => state - 1),
                on(reset, (state) => 0)
            );

            // counter.reducer.ts
            export const increment = createAction('[Counter Component] Increment');
            export const decrement = createAction('[Counter Component] Decrement');
            export const reset = createAction('[Counter Component] Reset');

            // app.module.ts
            @NgModule({
                ...,
                imports: [
                    ...,
                    StoreModule.forRoot({ count: counterReducer }),
                ],
                ...
            })
            export class AppModule { }

            // store.ts
            export interface IAppState {
                count: number
            }
        ```
* 