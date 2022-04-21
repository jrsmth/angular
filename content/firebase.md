## Building Real-time Serverless Apps with Firebase
* Firebase allows us to very quickly build a backend for our Angular applications, with:
    * A fast, scalable and real-time database in the cloud
    * Authentication
    * Cloud Messaging (notification, etc)
    * Storage
    * Analytics
* Firebase is a **BaaS** (Backend-as-a-Service)
* It is used in the tech-stacks of several large companies
    * including:
        * The New York Times
        * The Economist
        * Venmo
        * Twitch
        * Alibaba
        * Accenture
        * Lyft
    * [source](https://careerkarma.com/blog/companies-that-use-firebase/)
    * So it is probably worth taking seriously
* Firebase offers many feature for free, if your app grows they offer paid services: 
    * https://firebase.google.com/pricing
* Getting Started:
    * The Firebase console can be found at: 
        * https://console.firebase.google.com/
    * From the console we can create a new project
* Firebase Databases:
    * In general, we have two types of databases:
        * SQL (relational)
            * A SQL database (like MySQL or PostgreSQL) has a schema; that is a collection of tables and the relationships between them - a table is a logical group of columns with records/rows.
        * NoSQL (non-relational, non-tabular, document)
            * A NoSQL database (like MongoDB, CouchDB or Firebase) doesn't have a schema; it is tree of nodes - each node being a key:value pair. The value can be a primitive value or a complex object.
    * We can very easily create a Real-time Database in Firebase by going to the 'Realtime Database' section. It it straightforward to add records into our database.
        * Note, because Firebase is NoSQL (schema-less), our objects do not have to follow any kind of structure or be consistent with nested siblings.
            * SQL databases are optimised for reporting, we can run complex queries against multiple tables to retrieve data. Whereas, NoSQL is quick and flexible but doesn't allow us to query at the same level.

        <br>

        <img src="../resources/realtime_db.png" alt="Realtime Database" width="500">

        <br>

* Installing Firebase (Angular)
    * In this section, my examples can be found in ```../exercises/exercise-firebase/examples```
    * Steps:
        * ```npm i firebase```
        * ```ng add @angular/fire```
            * https://github.com/angular/angularfire
            * I selected these setup features: 
                * ng deploy -- hosting
                * Authentication
                * Firestore
                * Realtime Database
            * This will automatically import the right modules into ```app.module.ts``` and point ```environment.ts``` at our Firebase project in the cloud. In older versions, we had to manually update these two files.
* Reading Lists
    * The process of 'reading Lists' concerns reading data from our Firebase NoSQL database into our Angular app.
        * To do this we need to inject the ```AngularFireDatabase``` as a dependency into our constructor. Then we get the result in an observable and can render it on the screen, using ```*ngFor```.
            * We will get a permissions error, unless we grant access to the database from the Firebase console. We can set add an authenticated user and use this on the client-side, or we grant public READ-only access to the whole tree (or part of it).
                * Configure Realtime Database rules (public READ-only):
                ```json
                    {
                        "rules": {
                            ".read": true,
                            ".write": false
                        }
                    }
                ```
    * Note:
        * Using the latest version of `angularfire` (v7), I got the following error:
            ```typescript
                ERROR NullInjectorError: 
                    R3InjectorError(AppModule)[AngularFireDatabase -> 
                    InjectionToken angularfire2.app.options -> 
                    InjectionToken angularfire2.app.options ->
                    InjectionToken angularfire2.app.options]:
                        NullInjectorError: No provider for InjectionToken
            ```
            * This was quite tricky to debug. I used the following resources:
                * Stack Overflow [post](https://stackoverflow.com/questions/47380239/nullinjectorerror-no-provider-for-angularfirestore)
                * Stack Overflow [post](https://stackoverflow.com/questions/69844586/nullinjectorerror-no-provider-for-injectiontoken-angularfire2-app-options-2021)
                * AngularFire [docs](https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md)
                    * [version 7 changes](https://github.com/angular/angularfire/blob/master/docs/version-7-upgrade.md)
                    * [list docs](https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md)
            * Solution:
                * AngularFire is undergoing major changes and documentation hasn't yet caught up yet - nor have certain bits of AngularFire itself.
                * When I added AngularFire, using ```ng add```, the following import was added to ```app.module.ts```:
                    * ```provideFirebaseApp(() => initializeApp(environment.firebase))```
                        * import:
                            * ```import { initializeApp,provideFirebaseApp } from '@angular/fire/app';```
                * However, this is incompatible with:
                    * ```AngularFireDatabase```, used in ```app.component.ts```
                        * import:
                            * ```import { AngularFireDatabase } from '@angular/fire/compat/database';```
                * Therefore, in ```app.module.ts```, we need to use the older compatible v6 version of the initialise app import:
                    * ```AngularFireModule.initializeApp(environment.firebase)```
                        * import: 
                            * ```import { AngularFireModule } from '@angular/fire/compat';```
        * If we don't pay attention to how we structure our NoSQL tree, we may have trouble rendering data in a view. If we have a list of objects that are inconsistent, we will have a hard time using the ```*ngFor``` directive to loop over them and access common properties (if the properties are not common due to the inconsistency).
    * example:
        ```typescript
            // app.module.ts
            ...
            import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
            import { AngularFireModule } from '@angular/fire/compat';

            @NgModule({
                declarations: [
                    AppComponent
                ],
                imports: [
                    BrowserModule,
                    AppRoutingModule,
                    // provideFirebaseApp(() => initializeApp(environment.firebase)),
                    // ^auto-generated import
                        // incompatible with AngularFireDatabase from '@angular/fire/compat/database'
                    AngularFireModule.initializeApp(environment.firebase),
                    provideAuth(() => getAuth()),
                    provideDatabase(() => getDatabase()),
                    provideFirestore(() => getFirestore()),
                ],
                providers: [],
                bootstrap: [AppComponent]
            })
            export class AppModule { }

            // app.component.ts
            import { Component } from '@angular/core';
            import { AngularFireDatabase } from '@angular/fire/compat/database';

            @Component({
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            })
            export class AppComponent {
                title = 'examples';
                courses: any[] = [];

                constructor(db: AngularFireDatabase) {
                    db.list('/Courses').valueChanges().subscribe(courses => {
                    this.courses = courses;
                    console.log(this.courses);
                    })
                }
            }
        ```
        ```html
            <!-- app.component.html -->
            <ul>
                <li *ngFor="let course of courses">
                    {{ course }}
                </li>
            </ul>
        ```
* Realtime Databases
    * The Firebase Realtime Database is called 'Realtime' becuase changes in our data will be automatically reflected in the client, where we read from it.
        * This is without even refreshing the page - magic.
* Observables and Memory Leaks
    * Following on from the above, the database Firebase offers us is Realtime. Everytime a change is made to the database, a new list is requested by our frontend Angular app. We don't need to be concerned about performance issues here, as Firebase is optimised for this. 
        * However, we do need watch out for Memory Leaks.
            * This is where the application begins to consume much more memory than it actually needs and will begin to occur when we subscribe to a List in our Firebase database.
                * Unless we unsubscribe from the subscription to the Observable, we will request a new List every time the database is modified, regardless of whether the component using the List is being used in the view or not. This is because, whether or not the component is currently being used, the subscription to the Observable remains in memory. In our small app it isn't a problem but in a large application it would be.
                    * To unsubscribe from the Observable, we handle the ```OnDestroy``` lifecycle hook interface and explicity unsubscribe from the Observable.
                        * example:
                            ```typescript
                                // app.component.ts
                                export class AppComponent implements OnDestroy {
                                    title = 'examples';
                                    courses: any[] = [];
                                    subscription: Subscription;

                                    constructor(db: AngularFireDatabase) {
                                        this.subscription = db.list('/Courses').valueChanges().subscribe(courses => {
                                        this.courses = courses;
                                        console.log(this.courses);
                                        })
                                    }

                                    ngOnDestroy() {
                                        this.subscription.unsubscribe();
                                    }
                                }
                            ```
                            ```html
                                <!-- app.component.html -->
                                <button
                                    (click)="ngOnDestroy()">
                                    Go Offline
                                </button>
                                ...
                            ```
                    * There is a neater way to implement this functionality using the Async Pipe: ``` {{ observable_field | async }} ```
                        * When we use the ``` | async``` pipe on an observable field, the following happens:
                            * The pipe subscribes to the Observable and gets the latest value.
                            * When a new value is available from the Observable, the pipe will mark the component for change detection.
                                * Angular will automatically refresh the component and render the latest data.
                            * Finally, when the component is going to be destroyed, the pipe will unsubscribe from the Observable to prevent memory leaks.
                        * Note:
                            * The ```$```-suffix is a convention used to signal that a variable is an Observable.
                        * This approach is recommended over the explicity use of ```subscription.unsubscribe();```, detailed above.
                        * example:
                            ```typescript
                                // app.component.ts
                                export class AppComponent {
                                    courses$: Observable<any>; // the $-suffix is used to denote an Observable

                                    constructor(db: AngularFireDatabase) {
                                        this.courses$ = db.list('/Courses').valueChanges();
                                    }
                                }
                            ```
                            ```html
                                <!-- app.component.html -->
                                <ul>
                                    <li *ngFor="let course of courses$ | async">
                                        {{ course }}
                                    </li>
                                </ul>
                            ```
* Reading an Object
    * Similar to reading a List, we can read in a specific Object into our Angular app from the Firebase database.
        * To do this we use the ```db.object(<PATH>)``` method, where the ```<PATH>``` represents the path to our object through our NoSQL node tree - this is really intuitive to use, I like it.
    * example:
        ```typescript
            // app.component.ts
            export class AppComponent {
                courses$: Observable<any>; // the $-suffix is used to denote an Observable
                course1$: Observable<any>;
                course4$: Observable<any>;

                constructor(db: AngularFireDatabase) {
                    this.courses$ = db.list('/Courses').valueChanges();
                    this.course1$ = db.object('/Courses/1').valueChanges();
                    this.course4$ = db.object('/Courses/4').valueChanges();
                }
            }
        ```
        ```html
            <!-- app.component.html -->
            <h3> /Courses/1 </h3>
            <p> {{ course1$ | async | json }} </p>

            <h3> /Courses/4 </h3>
            <p> {{ course4$ | async | json }} </p>
        ```
* 'As' Keyword
    * If we have used the ```async``` pipe in multiple places, we can use the ```as``` keyword to refactor our template and improve readability.
    * example:
        ```html
            <!-- app.component.html -->

            <!-- BEFORE -->
            <h3> Without as</h3>
            <ul>
                <li> {{ (course4$ | async)?.author }} </li>
                <li> {{ (course4$ | async)?.name }} </li>
                <li> {{ (course4$ | async)?.isComplex }} </li>
                <li> {{ (course4$ | async)?.price }} </li>
            </ul>

            <!-- AFTER -->
            <h3> With as</h3>
            <ul *ngIf="course4$ | async as course4">
                <li> {{ course4.author }} </li>
                <li> {{ course4.name }} </li>
                <li> {{ course4.isComplex }} </li>
                <li> {{ course4.price }} </li>
            </ul>
        ```
* Adding an Object
    * To add an Object to our node tree from Angular, we need to use ```.push()``` method that belongs to ```db.list(<PATH>)```.
    * Note, ```FirebaseListObservable``` is deprecated and we should follow the method in the AngularFire docs ([here](https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md)).
    * example:
        ```typescript
            // app.component.ts
            ...
            add(course: HTMLInputElement){
                const courseRef = this.db.list('/Courses');
                courseRef.push({
                name: course.value,
                price: 149.99,
                isLive: true,
                sections: [
                    { title: 'Components' },
                    { title: 'Directives' },
                    { title: 'Templates' }
                ]
                });
                course.value = '';
            }
        ```
        ```html
            <!-- app.component.html -->
            <input type="text" (keyup.enter)="add(course)" #course>
        ```
* Updating an Object
    * rewatch the vid, get it right - PROPER.
    * document accordingly.



<br>
<br>
    * example:
        ```typescript
            // app.component.ts

        ```
        ```html
            <!-- app.component.html -->
            
        ```
 

