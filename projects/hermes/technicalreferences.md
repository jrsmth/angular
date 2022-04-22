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


<br>

## Overcoming Obstacles
* **Issue**
    * Solution
