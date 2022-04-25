# Hermes Technical References

<br>

## Project Tooling
* Main Development Languages
    * TypeScript: ```4.6.2```
* Build Tools:
    * npm: ```8.5.2```
* Frameworks:
    * Node JS: ```17.7.1```
    * Angular: ```13.3.3```
* Notable Libraries
    * angular-fire: ```7.3.0```
    * firebase: ```9.6.11```
    * rxjs: ```7.5.0```
    * bootstrap: ```4.3```

<br>

## Useful Commands
* **Deploy to Firebase**
    * Inital setup
        * ```npm i firebase```
        * ```ng add @angular/fire```
        * ```npm i -g firebase-tools```
    * Deploy
        * ```ng build```
        * ```firebase deploy```

<br>

## Further Documentation
* **Install Bootstrap4**
    * ```npm i bootstrap@4.3```
    * Import ```bootstrap.css``` into global stylesheet (```styles.css```)
        * ```@import "~bootstrap/dist/css/bootstrap.css";```
    * Useful [starter template](https://getbootstrap.com/docs/4.3/examples/starter-template/) (view source)
    * Note:
        * We should avoid importing Bootstrap's JS library when working with Angular because it uses JQuery. 
            * It it bad practise to mix JQuery and Angular becuase JQuery manipulates the DOM directly; whereas we want to use Angular as an abstraction of the DOM.
            * Use ```ng-bootstap``` instead:
                * ```ng add @ng-bootstrap/ng-bootstrap```
* **SASS vs SCSS**
    * Good Stack Overflow [post](https://stackoverflow.com/questions/5654447/whats-the-difference-between-scss-and-sass)
        * TLDR: 
            * SASS (Syntactically Awesome StyleSheets) has two syntaxes:
                * ```.scss``` (Sassy CSS) - newer
                * ```.sass``` - orignal
* **Firebase Arrays**
    * The Firebase Realtime Database doesn't support arrays
        * source: Firebase blog [post](https://firebase.blog/posts/2014/04/best-practices-arrays-in-firebase)
* **Firebase Authentication Route Guard**
    * Stack Overflow [post](https://stackoverflow.com/questions/52473504/working-with-angularfireobject-and-switchmap/52483642#52483642) for working with ```AngularFireObjects``` and ```switchMap```
    * Official [docs](https://github.com/angular/angularfire/blob/master/docs/auth/router-guards.md) for the updated way to apply route guards with Firebase (not used in this app)

<br>

## Overcoming Obstacles
* **@firebase/database: FIREBASE WARNING: Database lives in a different region. Please change your database URL to "..."**
    * Add *this* to ```environement.ts``` and ```environment.prod.ts```
        ```typescript
            export const environment = {
                firebase: {
                    ...,
                    databaseURL: "https://hermes-c4663-default-rtdb.europe-west1.firebasedatabase.app"
                    // ^your firebase URL
                },
                production: ...
            };
        ```
    * source: Stack Overflow [post](https://stackoverflow.com/questions/50501333/angular-firebasedatabase-error-cannot-read-property-databaseurl-of-undefined)
* **Rxjs switchMap operator (nested Observables) and async pipe infinite loop**
    * We can enter an infinite loop when we use an ```async |``` in our templates that unwraps an Observable that uses ```switchMap```.
        * The ```async |``` marks the template for change detection everytime there is a new value in the Observable being unwrapped. If we have nested Observables, we enter an infinite loop and the template will not be rendered properly.
        * The solution is to unwrap the Observable directly, in the component typescript class.