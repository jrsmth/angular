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
* **Official Docs**
    * **AngularFire docs**
        * https://github.com/angular/angularfire/tree/master/docs
    * **Bootstrap 4.3 docs**
        * https://getbootstrap.com/docs/4.3/getting-started/introduction/
            * Bootstrap [card](https://getbootstrap.com/docs/4.3/components/card/)
            * Bootstrap [grid](https://getbootstrap.com/docs/4.3/layout/grid/#equal-width-multi-row)
    * **ng2-validation docs (Custom Form Validators)**
        * https://www.npmjs.com/package/ng2-validation
        * https://github.com/yuyang041060120/ng2-validation#readme
    * **angular-4-data-table**
        * https://github.com/MIt9/angular-4-data-table
        * https://github.com/ggmod/angular-2-data-table
            * https://ggmod.github.io/angular-2-data-table-demo/
* **Install Bootstrap4.3**
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
* **Firebase Database: valueChanges() vs snapshotChanges()**
    * Use ```snapshotChanges()``` when we need to access the object's key.
        * example: 
            ```html
                 <option 
                    *ngFor="let c of categories$ | async"
                    [value]="c.payload.key">
                    {{ c.payload.val().name }}
                </option>
            ```
            * Make sure to strongly type the field in the component, else errors occur at runtime.
                ```typescript
                    error TS2571: Object is of type 'unknown'.
                    
                    
                    categories$: Observable<any>;
                ```
    * Otherwise, use ```valueChanges()```. 
        * It is simpler to retrieve the object values with this method, as they aren't wrapped in metadata inside the Observable - unlike ```snapshotChanges()```.
    * Should I delegate the decision to the component or the service layer?
        * On one hand, putting this logic in the component increases complexity and begins to violate separation of concerns. However, on the other hand, putting it in the service layer reduces flexibility and means have to make a decision early about whether to use ```valueChanges()``` or ```snapshotChanges()``` in all components that require this service - ideally, we should defer decision making as long as possible (keep our options open).
            * As Mosh says, building software is about trade-offs. Based on the above, I believe this decision should be delegated to the component. Not a perfect solution but delivering value is the highest aim.
    * Source: AngularFire [docs](https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md)
* **Node Version Manager (nvm)**
    * Very useful when switching between projects that have different node/npm versions.
        * [docs](https://npm.github.io/installation-setup-docs/installing/using-a-node-version-manager.html)
        *  ```nvm install <NODE_VERSION>```
            * ```nvm use 17```
* **Using `this.FIELD` in your markup**
    * In your component template, you can reference a TypeScript field using both `this.FIELD` (as you would in your component TS class) or simply with `FIELD`.
        * You should use the latter, `FIELD`, to reduce noise in your markup.
* **HTML Hacks**
    1. Use Emmet Abbreviations to generate markup quickly ([docs](https://docs.emmet.io/cheat-sheet/))
    2. In VS Code, when copying large chunks of markup, collapse the parent element and copy that.
* **Useful TypeScript Plugins for VSCode**
    * ```Move TS```
        * automatically updates import statements when we move files around (think refactoring modules)
    * ```TypeScript Hero```
        * automatically removes unused import statements and arranges them alphabetically
    * use ```clt-option(alt)-o``` to organise import statements alphabetically
* **Avoiding ./../../... import statements**
    * We can avoid ugly import statements by defining aliases in ```./tsconfig.json``` (see file for example).
* **Modularisation**
    * Where possible, we should split our Angular apps into different modules, such as 'core', 'shared', etc
        * We should keep these modules lightweight and avoid circular dependencies (importing a module into a module that depends on it)
    * If multiple modules depend on a conistent set of modules, you can import that set into the 'shared' module and then export them again
        * That way, you can simply import 'shared' module to replace that set of modules

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
* **error TS2571: Object is of type 'unknown'.**
    * This error occured for me when unwrapping an Observable in a template with the ```async |``` and accessing the properties inside ```*ngFor=""```.
        ```html
            <!-- admin-product.component.html -->
            <tr *ngFor="let p of products$ | async">
                <td>{{ p.payload.val().title }}</td>
                <td>{{ p.payload.val().price }}</td>
                <td>
                    <a [routerLink]="['/admin/products/', p.payload.key]">
                        Edit
                    </a>
                </td>
            </tr>
        ```
    * I solved the problem by strongly typing the field in the component
        ```typescript
            // admin-product.component.ts
            products$: Observable<any>;

            //BEFORE
            products$;
        ```
* **(```ng serve```) TypeError: Cannot read properties of null (reading 'fileName')**
    * I cannot compile the app with ```ng serve```, since adding ```angular-4-data-table```.
    * I believe that this is the result of incompatability issues between my version of Angular (```v13```) and the ```angular-4-data-table``` dependency.
    * Due to time constraints, I decided to remove the library, using:
        *  ```npm uninstall angular-4-data-table```
        * This means I will skip the sorting and pagination features for the product table but this won't affect the overall architecture for the app. 
            * Perhaps in the future I/someone else will implement this features using more modern Angular libraries.