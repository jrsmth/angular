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





