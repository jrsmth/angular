## Consuming HTTP Services
* Angular is a JS framework for creating frontend/client-side applications that deal with the presentation logic of data; we should leave processing and storage to backend/server-side applications, written in frameworks like Spring.
    * This means that we need to consume HTTP services in the backend to perform CRUD operations on data.
* For this section, we will use ```https://jsonplaceholder.typicode.com/``` to act as a backend service that we can make REST calls to.
* To perform HTTP requests in Angular, we neeed to import the ```HttpClientModule``` into ```src/app/app.module.ts```.
    * Note, that ```HttpModule``` and ```Http``` were deprecated in Angular 5 and replaced with the ```HttpClient``` classes mentioned above.
        * Stack Overflow [post](https://stackoverflow.com/questions/38510369/cannot-find-module-angular-http)
            * In Angular 4.3+, the use of ```HttpClient``` means that we don't have to use ```response.json()``` to work with our request response (```HttpClient``` is taking care of this for us)
                * Stack Overflow [post](https://stackoverflow.com/questions/46005430/property-json-does-not-exist-on-type-object)
                * Note, when working in older version of Angular (or vanilla JS - ```fetch``` API), you will need to use ```response.json()``` to access the data. 
    * We use a ```http``` object of type ```HttpClient``` class to make requests in Angular.
* In this section, I have created my examples in ```../exercises/exercise-consuming-http/examples```.
* HTTP Requests
    * Methods
        * GET - retrieve a resource
        * POST - create a resource
        * PUT - update a resource
            * PATCH - partially updates a resource
        * DELETE - remove a resource
    * Idempotency
        * Idemopotency is where the result of a request is independent from the number of times you execute it.
        * All of these verbs are idempotent, apart from POST.
* Getting data (GET, READ)
    * ```http.get(<URL>)``` is used to make GET requests to an endpoint
        * this returns an ```Observable<Response>```
            * An ```Observable``` is used to enable async communication by implementing the observer pattern.
                * We can chain a ```.subscribe()``` method to the GET request to listen out for when the async request completes.
    * example:
        ```html
            <!-- posts.component.html -->
            <ul class="list-group">
                <li
                    *ngFor="let post of posts"
                    class="list-group-item">
                    {{ post.title }}
                </li>
            </ul>
        ```
        ```typescript
            // posts.component.ts
            export class PostsComponent {
                posts: any;

                constructor(http: HttpClient) {
                    http.get('https://jsonplaceholder.typicode.com/posts/')
                    .subscribe(response => {
                        console.log(response)
                        this.posts = response;
                    });
                }
            }
        ```
* Creating data (POST, CREATE)
    * Recap: remember that declaring a constructor parameter as ```private``` will create it as a property in our component.
        * Typescript [docs](https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties)
            * ```TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value. These are called parameter properties and are created by prefixing a constructor argument with one of the visibility modifiers public, private, protected, or readonly```.
    * To make a POST request in Angular, we use ```http.post(<URL>, <BODY>)```; where ```<BODY>``` is a JSON object that we want to send to the server; converted into a string - ```JSON.stringify(<BODY>)```.
        * Like all requests made using ```HTTPClient```, ```http.post()``` returns an ```Observable``` and so we can ```.subscribe()``` to await the async response.
    * example:
        ```html
            <!-- posts.component.html -->
            <input
                (keyup.enter)="createPost(title)" 
                #title
                type="text"
                placeholder="Add a new post"
                class="form-control">
            ...
        ```
        ```typescript
            // posts.component.ts
            ...
            createPost(input: HTMLInputElement) {
                let post: any = { title: input.value };
                input.value = ''; // clear field

                this.http.post(this.url, JSON.stringify(post))
                .subscribe(response => {
                    post.id = (response as any).id;
                    this.posts.splice(0, 0, post); // insert 'new post' at pos. 0
                    console.log(this.posts);
                });
            }
        ```
* Updating data (PUT, UPDATE)
    * PUT vs PATCH
        * A PUT request requires that we send the full data structure in order to update our object; whereas PATCH requires that we only send the fields to be modified.
        * Which should you use?
            * Given the choice between the two, it makes sense to use the PATCH method, as we avoid sending across redundant data - there may be a slight performance benefit and we don't have to build more of the object's data structure than necessary on the client side. However, PATCH is not widely supported and sometimes it is easier to work with the full object. In these cases, it makes sense to use PUT.
    * To make a PUT request in Angular, we use ```http.put(<URL>, <BODY>)```; where ```<BODY>``` is a JSON object containing the full data structure for this resource; converted into a string - ```JSON.stringify(<BODY>)```.
        * Or we can use ```http.patch(<URL>, <BODY>)```; where ```<BODY>``` is an object containing only the fields that we want to change.
        * Like all requests made using ```HTTPClient```, ```http.post()``` returns an ```Observable``` and so we can ```.subscribe()``` to await the async response.
    * example
        ```html
            <!-- posts.component.html -->
            <li
                *ngFor="let post of posts"
                class="list-group-item">
                {{ post.title }}
                <button 
                    (click)="updatePost(post)"
                    class="btn btn-default btn-sm btn-edit">
                    <span 
                        class="glyphicon glyphicon-edit">
                    </span>
                </button>
            </li>
            ...
        ```
        ```typescript
            // posts.component.ts
            ...
            updatePost(post: any){ // could use a DTO for strong typing
                let url = this.url + '/' + post.id;

                // PUT
                this.http.put(url, JSON.stringify(post));

                // PATCH
                this.http.patch(url, JSON.stringify({ isRead: true }))
                .subscribe(response => {
                    console.log(response);
                });
            }
        ```
* Removing data (DELETE, DELETE)
    * To remove a resource, we use```http.delete(<URL>)```.
    * example:
        ```html
            <!-- posts.component.html -->
            <li
                *ngFor="let post of posts"
                class="list-group-item">
                {{ post.title }}
                <button 
                    (click)="deletePost(post)"
                    class="btn btn-default btn-sm btn-edit btn-delete">
                    <span 
                        class="glyphicon glyphicon-trash">
                    </span>
                </button>
                ...
            </li>
        ```
        ```typescript
            // posts.component.ts
            ...
            deletePost(post: any) {
                let url = this.url + '/' + post.id;
                this.http.delete(url)
                .subscribe(response => {
                    let index = this.posts.indexOf(post);
                    this.posts.splice(index, 1);
                })
            }
        ```
* OnInit Interface
    * As best practise, constructors should be small and lightweight; therefore, we should avoid making HTTP requests in the constructor.
    * Components in Angular have life cycle hooks and so there exists methods that we can call when a component has reached a particular state in its lifecycle. 
        * These lifecycle hooks are: [docs](https://angular.io/guide/lifecycle-hooks)
            * ```ngOnChanges```: When an input binding value changes.
            * ```ngOnInit```: After the first ngOnChanges.
            * ```ngDoCheck```: Developer's custom change detection.
            * ```ngAfterContentInit```: After component content initialized.
            * ```ngAfterContentChecked```: After every check of component content.
            * ```ngAfterViewInit```: After a component's views are initialized.
            * ```ngAfterViewChecked```: After every check of a component's views.
            *  ```ngOnDestroy```: Just before the directive is destroyed.
        * If we define these methods in our component, Angular will call them when the lifecycle stage has occurred.
            * ```ngOnInit()``` is one of these methods.
    * ```ngOnInit()``` is a lifecyle method that gets called automatically by Angular when the component is initialised.
        * The ```OnInit``` interface is used to enforce that your component implements the ```ngOnInit()``` method, via compile-time checking.
    * If you need to make a HTTP request in order to build your view, you should do so in ```ngOnInit()```.
    * example:
        ```typescript
            // posts.component.ts
            export class PostsComponent implements OnInit {
                ...
                constructor(private http: HttpClient) { }

                ngOnInit(): void {
                    this.http.get(this.url)
                        .subscribe(response => {
                            console.log(response);
                            this.posts = response;
                        });
                }
            }
        ```
* Separations of Concern (Service Layer)
    * Following the ***S.O.L.I.D*** principles of Object-Oriented design, our classes should have a ***S***ingle responsibility.
        * Else they are harder to extend, maintain, reuse and test.
    * We should not be making HTTP requests directly from our component class, it should just focus on the presentation logic.
        * We should delegate the request logic to a service layer and then inject a service object as a dependency into our component.
    * Service Layer
        * Generate a service using the ```ng``` CLI
            * ```ng c service <NAME>```
                * We drop the word ```service``` from the ```<NAME>```, as Angular adds it for us.
        * It is good practise to group your service classes in a ```src/app/services``` directory
            * For some reason, the ```ng``` CLI doesn't this for you.
        * Register the new service in ```src/app/app.module.ts```, in the ```providers: []``` section.
            * For some reason, the ```ng``` CLI doesn't this for you.
    * example:
        ```typescript
            // post.component.ts
            export class PostsComponent implements OnInit {
            posts: any;

            constructor(private service: PostService) { }

            ngOnInit(): void {
                this.service.getPosts()
                .subscribe(response => {
                    console.log(response);
                    this.posts = response;
                });
            }

            createPost(input: HTMLInputElement) {
                let post: any = { title: input.value };
                input.value = '';

                this.service.createPost(post)
                .subscribe(response => {
                    ...
                });
            }

            updatePost(post: any){
                post.isRead = true;
                this.service.updatePost(post)
                .subscribe(response => {
                    ...
                });
            }

            deletePost(post: any) {
                this.service.deletePost(post.id)
                .subscribe(response => {
                    ..
                })
            }

            }
        ```
        ```typescript
            // src/app/services/posts.service.ts
            export class PostService {
                private url = 'https://jsonplaceholder.typicode.com/posts';

                constructor(private http: HttpClient) { }

                getPosts() {
                    return this.http.get(this.url);
                }

                createPost(post: any) {
                    return this.http.post(this.url, JSON.stringify(post));
                }

                updatePost(post: any) {
                    return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
                }

                deletePost(id: number) {
                    return this.http.delete(this.url + '/' + id);
                }

            }
        ```
* Handling Errors
    * We can separate errors into two categories:
        * Unexpected
            * server is offline
            * network is down
            * unhandled exceptions on the server-side
        * Expected
            * ```404 Not Found``` error messages    
                * example: two users are viewing the same page and one deletes a resource that the other is viewing; if the a viewing user then tries to modify that resource, they will get a ```404 Not Found``` as the resource doesn't exist.
            * ```400 Bad Request``` error messages
                * example: if a user tries to create a new user, using a username that already exists, they will normally get a ```400 Bad Request```.
    * Handling Unexpected Errors
        * We can handle unexpected error by using the second parameter in the ```.subscribe()``` method; it allows us to define a function that deals with the error.
            * Note, the overloaded version of ```.subscribe()``` in Mosh's videos has been deprecated - I've used a newer version in the example below.
                * Stack Overflow [post](https://stackoverflow.com/questions/55472124/subscribe-is-deprecated-use-an-observer-instead-of-an-error-callback)
        * In a real world application, we would want to notify the user that was a problem - the best practise is to use a 'toast' notification. Also we would want to error to be logged and stored in a database for analysis, retrospectively.
        * example:
            ```typescript
                // post.component.ts
                ...
                ngOnInit(): void {
                    this.service.getPosts()
                    .subscribe({
                        next: (response) => {
                            this.posts = response; 
                        }, 
                        error: (error) => {
                            alert('An unexpected error occurred.'); // simulated toast notification
                            console.log(error); // simulated log to database
                        } 
                    });
                }
                ...
            ```
    * Handling Expected Errors
        *  It is best practise to separate the concerns of error handling from the presentation logic in the component. 
            * Whilst it is possible to handle errors in the component, using the technique below, we shouldn't do it.
                * example:
                    ```typescript
                        // post.component.ts
                          deletePost(post: any) {
                                this.service.deletePost(post.id)
                                .subscribe({
                                    next: (response) => {
                                    console.log(response);
                                    let index = this.posts.indexOf(post);
                                    this.posts.splice(index, 1);
                                    }, 
                                    error: (error: Response) => {
                                    if (error.status === 404) 
                                        alert('This post has already been deleted'); // simulated toast notification
                                    else
                                        alert('An unexpected error occurred.'); // simulated toast notification
                                    console.log(error); // simulated log to database
                                    }
                                });
                            }
                    ```
        * We should handle errors in the service layer and can throw application specific errors by using a ```src/app/commmon/errors/app-error.ts``` class.
            * example:
                ```typescript
                    // post.component.ts
                    ...
                    createPost(input: HTMLInputElement) {
                        let post: any = { title: input.value };
                        input.value = ''; // clear field

                        this.service.createPost(post)
                        .subscribe({
                            next: (response) => {
                            post.id = (response as any).id;
                            this.posts.splice(0, 0, post); // insert 'new post' at pos. 0
                            console.log(this.posts);
                            }, 
                            error: (error: AppError) => {
                            if (error instanceof BadInputError)
                                alert('An error occured with the input data');
                                // this.form.setErrors(error.originalError);
                                // if this was tied to a form, we could set err programmatically
                            else 
                                alert('An unexpected error occurred.'); // simulated toast notification
                            console.log(error); // simulated log to database
                            }
                        });
                    }
                    ...

                    // post.service.ts
                    ...
                    createPost(post: any) {
                        return this.http.post(this.url, JSON.stringify(post)).pipe(
                        catchError( (error: Response) => {
                            if (error.status === 400) 
                            return throwError(new BadInputError(error))

                            return throwError(new AppError(error));        
                        }));
                    }
                    ...

                    // src/app/common/errors/app-error.ts
                    export class AppError {
                        constructor(public originalError?: any) {}
                    }

                    // src/app/common/errors/bad-input-error.ts
                    import { AppError } from "./app-error";

                    export class BadInputError extends AppError {}
                ```
                * Note, in the Udemy course, much of the ```rxjs``` content has been deprecated and replaced with newer syntax.
                    * helpful Stack Overflow [post](https://stackoverflow.com/questions/50291570/module-not-found-error-cant-resolve-rxjs-add-operator-catch-in-f-angular )
    * Global Error Handling
        * We can handle unexpected errors globall across our application by using a ```src/app/common/errors/app-error-handler.ts``` class.
            * In this class, we implement the built-in ```ErrorHandler``` interface's ```handleError()``` method to typically provide a message to the user and record the unexpected error in the logs.
            * We then register this class as a provider in ```src/app/app.module.ts```, using the format that replaces every instance of ```ErrorHandler``` with our custom implementation at runtime.
                * ```providers: [{provide: ErrorHandler, useClass: AppErrorHandler}]```
                * [ErrorHandler docs](https://angular.io/api/core/ErrorHandler#description)
            * example:
                ```typescript
                    // post.component.ts
                    ...
                    updatePost(post: any){
                        post.isRead = true;
                        this.service.updatePost(post)
                        .subscribe({
                            next: (response) => {
                            console.log(response);
                            }
                        });
                    }

                    deletePost(post: any) {
                        this.service.deletePost(345) // post.id // simulates 404 err
                        .subscribe({
                            next: (response) => {
                                console.log(response);
                                let index = this.posts.indexOf(post);
                                this.posts.splice(index, 1);
                            }, 
                            error: (error: AppError) => {
                            if (error instanceof NotFoundError) 
                                alert('This post has already been deleted'); // simulated toast notification
                            else throw error; // propagate the error to the global error handler
                            }
                        });
                    }
                    ...

                    // src/app/common/errors/app-error-handler.ts
                    export class AppErrorHandler implements ErrorHandler {
                        handleError(error: any): void {
                            alert('An unexpected error occurred.'); // simulated toast notification
                            console.log(error); // simulated log to database
                        }
                    }
                ```
    * Extracting a Reusable Error Handling Method
        * We can refactor the code in ```post.service.ts``` and create a ```private``` eror handling method:
            * example:
                ```typescript
                    // post.service.ts
                    ...
                    updatePost(post: any) {
                        return this.http.put(this.url + '/' + post.id, JSON.stringify(post)).pipe(
                        catchError(this.handleError)); // method reference, not method call;
                    }

                    deletePost(id: number){
                        // return this.http.delete(this.url + '/' + id ).pipe(
                        // DELETE of this URL isn't working as expected
                            // GET simulates better
                        return this.http.get(this.url + '/' + id ).pipe(
                        catchError(this.handleError)); // method reference, not method call
                    }

                    private handleError(error: Response) {
                        if (error.status === 400) 
                        return throwError(new BadInputError())
                        else if (error.status === 404) 
                        return throwError(new NotFoundError())
                        else
                        return throwError(new AppError(error)); 
                    }
                    ...
                ```
    * Extracting a Reusable Data Service
        * Our ```post.service.ts``` contains a lot of reusable code that we can extract to a generic service class; should we need to create mutliple services in our application, we can extend this base service class (```data.service.ts```).
        * example:
            ```typescript
                // src/app/services/data.service.ts
                ...
                export class DataService {

                    constructor(@Inject(String) private url: string, private http: HttpClient) { }

                    getAll() {
                        return this.http.get(this.url).pipe(
                        catchError(this.handleError)); // method reference, not method call;
                    }

                    create(resource: any) {
                        return this.http.post(this.url, JSON.stringify(resource)).pipe(
                        catchError(this.handleError)); // method reference, not method call
                    }

                    update(resource: any) {
                        return this.http.put(this.url + '/' + resource.id, JSON.stringify(resource)).pipe(
                        catchError(this.handleError)); // method reference, not method call;
                    }

                    delete(id: number){
                        // return this.http.delete(this.url + '/' + id ).pipe(
                        // DELETE of this URL isn't working as expected
                            // GET simulates better
                        return this.http.get(this.url + '/' + id ).pipe(
                        catchError(this.handleError)); // method reference, not method call
                    }

                    private handleError(error: Response) {
                        if (error.status === 400) 
                        return throwError(new BadInputError())
                        else if (error.status === 404) 
                        return throwError(new NotFoundError())
                        else
                        return throwError(new AppError(error)); 
                    }

                }

                // post.service.ts
                export class PostService extends DataService {
                    constructor(http: HttpClient) { 
                        super('https://jsonplaceholder.typicode.com/posts', http);
                        // super() is required bc to create an instance of a derrived class
                            // we need to create an instance of the base class
                    }
                }

                // post.component.ts
                ...
                updatePost(post: any){
                    post.isRead = true;
                    this.service.update(post)
                    .subscribe({
                        next: (response) => {
                        console.log(response);
                        }
                    });
                }
                ...
            ```
            * error: ``` Consider using the @Inject decorator to specify an injection token. This type is not supported as injection token. ```
                * Stack Overflow [post](https://stackoverflow.com/questions/60801513/angular-9-error-ng2003-no-suitable-injection-token-for-parameter-url-of-cla)


