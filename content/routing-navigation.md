## Routing & Navigation
* In this section, I have created my examples in ```../exercises/exercise-routing-navigation/examples```. 
* There exists a module called ```Router```, in Angular.
    * Angular modules include:
        * ```Router```
        * ```Forms```
        * ```Reactive Forms```
        * ```Http```
* There are 3 steps to navigation in Angular:
    * Configure routes
        * A route is the mapping of a path to a component.
    * Add a router outlet
        * This is where is we display the corresponding component when a given route becomes active.
    * Add links
* Configuring Routes
    * We configure roots by adding ```RouterModule``` into ```src/app/app.module.ts``` and mapping paths to components.
        * example:
            ```typescript
                // app.module.ts
                ...
                imports: [
                    ...
                    RouterModule.forRoot([
                        { 
                            path: '', 
                            component: HomeComponent 
                        },
                        { 
                            path: 'followers', 
                            component: GithubFollowersComponent 
                        },
                        { 
                            path: 'profile/:username', 
                            component: GithubProfileComponent 
                        },
                        { 
                            path: 'posts', 
                            component: PostComponent 
                        },
                        { 
                            path: '**', 
                            component: NotFoundComponent 
                        }
                    ])
                ]
            ```
            * ```/:username``` is a parameter that will be dynamically replaced at runtime.
            * ```**``` is a wildcard, that catches any URL in the browser.
                * Note, order is important for the objects we supply to ```RouterModule.forRoot([])```.
                    * We must place the wildcard at the end or no other routes will be accessible.
                    * More specific routes need to be placed first; routes should be ordered from most-specific to least-specific.
* Router Outlet
    * We add a ```<router-outlet></router-outlet>``` directive to ```app.component.html```, so that we a route becomes active, the corresponding component is rendered after the ```<router-outlet>``` tag.
* RouterLink
    * We don't use the ```href``` attribute with Angular routing because every time we click on a link, the entire page is downloaded and the Angular app is re-initialised.
        * This causes the page to flicker unnecessarily, reducing the user experience.
    * When we click on a link, we only want the content on the new page to be downloaded -  to do this, we replace the ```href=""``` attribute with the ```routerLink="<PATH_NAME>"``` directive.
    * example:
        ```html
            <!-- navbar.component.html -->
            <ul class="nav navbar-nav">
                <li><a class="active" routerLink="/">Home</a></li>
                <li><a routerLink="/followers">Followers</a></li>
                <li><a routerLink="/posts">Posts</a></li>
            </ul>
        ```
    * An application built this way is referred to as a 'Single Page Application' (SPA).
        * A single page is downloaded from the server and as the user navigates from one page to another, only the contents of the target page is downloaded.
    * We use the property binding syntax when supplying a parameter to a ```routerLink``` at runtime. We bind the ```routerLink``` directive to an expression; an array of the path, followed by the path parameters.
        * example:
            ```html
                <!-- github-followers.component.html -->
                <div 
                    *ngFor="let follower of followers" 
                    [routerLink]="['/profile', follower.login]"
                    class="media">
                    ...
                    <div class="media-body">
                        ...
                        <a 
                            [routerLink]="follower.html_url" 
                            target="_blank">
                            {{ follower.html_url }}
                        </a>
                    </div>
                </div>
            ```
    * ```routerLink``` Syntax     
        <br>
        <img src='../resources/router_link.png' alt='Router Link' width='500'>
        
        <br>
    * Router Link Active
        * The standard Bootstrap ```li.active>``` syntax will highlight an element for us. However, we have to manually handle moving this class between the active list elements.
            * We use the ```routerLinkActive="<CLASS_NAME>"``` directive to handle this for us dynamically.
        * example: 
            ```html
                <!-- github-followers.component.html -->
                <ul class="nav navbar-nav">
                    <li><a routerLink="/">Home</a></li>
                    <li routerLinkActive="active"><a routerLink="/followers">Followers</a></li>
                    <li routerLinkActive="active"><a routerLink="/posts">Posts</a></li>
                </ul>
            ```
* Getting Route Parameters
    * In order to get access to a route parameter in our component, we need to provide an ```ActivatedRoute``` parameter in our constructor.
        * Recap: remember that we can only have a single constructor in our component.
    * This ```ActivatedRoute``` parameter has a ```paramMap``` that contains our route parameter. This ```paramMap``` is an Observable, which means we must ```.subscribe()``` to it in order to retrieve the data.
        * Why are Route Parameters Observable?
            * At a deeper level, an Observable is a collection of data that arrives, asynchronously, over time. Route Parameters use Observables to allow new route parameter to be supplied to the component, without the need to destroy and recreate the component each time.
    * example:
        ```typescript
            // github-profile.component.ts
            export class GithubProfileComponent implements OnInit {

                constructor(private route: ActivatedRoute) { }

                ngOnInit(): void {
                    this.route.paramMap
                    .subscribe(params => {
                        let username = params.get('username');
                        console.log(username);
                    })
                }

            }
        ```
    * Under special circumstances, there is a simpler way to get access to route parameters; if you are 100% sure that the user cannot navigate away from this page and then come back. In this case, instead of subscribing to an Observable, you can use a 'snapshot'.
        * We use ```.snapshot``` if we are certain that the user will not be coming back to this component.
    * Routes with Mutliple Parameters
        * Note, it improves search-engine-optimisation (SEO) if you have paths defined as ```/johnsmith/12345``` instead of just ```/12345```. This is a technique that Stack Overflow uses. 
            * example: ```https://stackoverflow.com/questions/50291570/module-not-found-error-cant-resolve-rxjs-add-operator-catch-in-f-angular```
        * To achieve this, we update our route configuration in ```app.module.ts```. As well as, appending another element to the array supplied to ```routerLink``` in ```github-followers.component.html```. 
        * example:
            ```typescript
                // app.module.ts
                imports: [
                    BrowserModule,
                    HttpClientModule,
                    RouterModule.forRoot([
                        ...
                        { 
                            path: 'profile/:username/:id', 
                            component: GithubProfileComponent 
                        }
                        ...
                    ])
                ...
            ```
            ```html
                <!-- github-followers.component.html -->
                <div 
                    *ngFor="let follower of followers" 
                    [routerLink]="['/profile', follower.login, follower.id]"
                    class="media">
                    ...
                </div>
            ``` 
* Query Parameters
    * We can supply optional ('Query') parameters as Route Parameters that are not required for this page to load.
    * The ```routerLink``` directive exports a property, called ```queryParams```; that we can use in a property binding expression to supply an object of optional parameters. We can then access these optional parameters in our component by using an ```ActivatedRoute``` object and accessing the ```queryParamMap``` Observable field.
        * Alternatively, we can use a ```.snapshot.paramMap``` if we are certain that the user will not be coming back to this component.
    * example:
        ```html
            <!-- navbar.component.html -->
            ...
            <ul class="nav navbar-nav">
                ...
                <li routerLinkActive="active">
                    <a 
                        routerLink="/followers"
                        [queryParams]="{ page: 1, order: 'newest'}">
                        Followers
                    </a>
                </li>
                ...
            </ul>
        ```
        ``` typescript
            // github-followers.component.ts
            ...
            constructor(
                private route: ActivatedRoute, 
                private service: GitHubFollowersService) { }

            ngOnInit(): void {
                this.getFollowers(this.user);

                this.route.queryParamMap
                    .subscribe(params => {
                        let page = params['get']('page');
                        console.log(page);
                        let order = params['get']('order');
                        console.log(order);
                    });
            }
            ...
        ```
* There is an Observable factory method, called ```combineLatest``` - which allows us to combine Observables together and thus get both required request parameters and query parameters by subscribing to a single Observable.
    * Note, bits of ```rxjs``` have been deprecated and replaced - [rxjs docs](https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest)
    * example:
        ```typescript
            // dummy code
            combineLatest(
                this.route.paramMap, // index 0, this is one Observable
                this.route.queryParamMap) // index 1, this is another Observable
            .subscribe( combined => {
                let id = combined[0].get('id');
                let order = combined[1]['get']('order');
                console.log(id);
                console.log(order);
            });
        ```
* The Switch Map Operator
    * Sometimes we may end up with a ```.subscribe()``` inside a ```.subscribe()``` function. To avoid this, we use the ```switchMap``` Operator.
        * [switchMap rxjs docs](https://www.learnrxjs.io/learn-rxjs/operators/transformation/switchmap)
* Programmatic Navigation
    * To navigate programmatically, we use the ```Router``` class' ```.navigate()``` method; supplying it a list of the path, plus any required parameteres. As well as supplying an object of any optional query parameters too.
    * example:
        ```typescript
            // github-profile.component.ts
            ...
            export class GithubProfileComponent implements OnInit {

                public username = '';

                constructor(private route: ActivatedRoute, private router: Router) { }

                ngOnInit(): void {
                    this.route.paramMap
                    .subscribe(params => {
                        // let username = params.get('username') !== null ? params.get('username') : ''; // type-guarding
                        this.username = params.get('username')!; // non-null assertion
                        console.log(this.username);
                    })
                }

                submit() {
                    this.router.navigate(['/followers'], { // Programmatic Navigation
                    queryParams: { page: 1, order: 'newest' }
                    });
                }
                
            }
        ```
        ```html
            <!-- github-profile.component.html -->

            {{ username }}

            <br><br><br>

            <button 
                (click)="submit()"
                class="btn btn-primary">
                Submit
            </button>
        ```
* Blog Archives Exercise
    * see ```../exercises/exercise-blog-archives/my-soln``` for my solution
    * see ```../exercises/exercise-blog-archives/mosh-soln``` for mosh' solution
        * notes:
            * String interpolation:
                * To avoid extra noise in your HTML template, you can combine individual instances of string interpolation and add supporting strings inside the ```{{ }}```
                    * example:
                        * before: ```{{ archive.event }}: {{ archive.month }}/{{ archive.year }}```
                        * after: ```{{ archive.event + ': ' + archive.month + '/' + archive.year }}```
            * Mosh chose to use a snapshot for retrieving the request parameters, whereas I went with the standard Observable route. I'm not sure which one would have been best practise in this case.
