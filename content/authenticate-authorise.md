## Authentication & Authorisation
* Generic Architecture
    * In general, the client authenticates a user by making a HTTP request to an authenticate endpoint on the server, with the user's login credentials. If successful, the server will respond with a JWT - which contains specific information about this user and is used to identify this particular user on both the client-side and server-side.

    <br>
    <img src="../resources/auth_architecture.png" width="500" alt="Authentication Architecture">

    <br>

    * We need to persist our JWT so it can exist across session restarts; if the user closes the browser and then opens it again, they should still have the JWT. Browser local storage is used to do this.
    * On the client, a JWT is used to identify the user. This allows us to:
        * display their name on the page
        * show/hide certain parts of a page
        * prevent access to certain routes
* JSON Web Tokens (JWT)
    * [jwt.io](https://jwt.io/)
        * example JWT:
            ```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.IgfIWP_XtusfBW3ltGuDKdGk4xJZkOjmyoqkjkAkWSI```
            * decoded:
                ```json
                    {
                        "alg": "HS256",
                        "typ": "JWT"
                    }
                ```
                ```json
                    {
                        "sub": "1234567890",
                        "name": "John Doe",
                        "admin": true
                    }
                ```
                ```html
                    HMACSHA256(
                        base64UrlEncode(header) + 
                        "." +
                        base64UrlEncode(payload),
                        <YOUR-256-BIT-SECRET>
                    )
                ```
    * The example JWT above is base64 encoded. This means that it is easier to send across the network but it isn't encrypted. Therefore we must avoid putting sensitive information in it.
    * A JWT is comprised of 3 parts, each seperated by a dot (```.```).
        * The first part is the ```HEADER```
            * This contains the 'signing' algorithm. This is a standard header that we don't have to worry about in most cases.
        * The second part is the ```PAYLOAD```
            *  The payload contains attributes for the given user. In the example above, the ```sub``` or 'subject' property is the user's id. The ```name``` property is also given, as well as their role (```admin```). We include commonly used basic properties of the user, to avoid having to look them up each time we want to use them in a HTTP request.
        * The third part is the ```DIGITAL SIGNATURE```
            *  The signature is used to prevent a malicious user from modifying any of the properties in the JWT. The signature is based on a 'secret' that exists on the server. Therefore a malicious user cannot generate the right digital signature to make a fake JWT. 
                * The signature is constructed using the encoded header and payload and therefore needs to be regenerated if we need to change either of these other two sections.
                    * To modify a property of the JWT payload, you need to regenerate the signature - which a malicious user couldn't do becuase the don't know the secret.
    * Good Stack Overflow [post](https://stackoverflow.com/questions/58341833/why-base64-is-used-in-jwts#:~:text=JWT%20uses%20Base64url%2C%20which%20is,be%20sent%20in%20the%20URL.) on JWT.
    * We include a few basic properties of the user in the JWT object, such as their name and id, so that we don't have to fetch this info from the database, everytime they are needed to make a request to the backend.
    * Base64 conversion in CLI
        * ```echo "STRING" | base64```
        * ```echo "ENCODED_STRING" | base64 --decode```
* Authentication vs Authorisation
    * Authentication is the process where we determine ***WHO*** a user is.
    * Authorisation is the process where we determine ***WHAT*** this user can do (permissions).
    * Good [article](https://www.okta.com/uk/identity-101/authentication-vs-authorization/)
        * "Authentication confirms that users are who they say they are. Authorisation gives those users permission to access a resource."

    <br>
    <img src="../resources/authenticate_vs_authorise.png" width="500" alt="Authentication Architecture">

    <br>

* Implementing Login
    * For this section, my example code can be found in ```../exercises/exercise-authenticate-authorise/examples```
        * Mosh' starter code did not work for me, so I had to build my own version.
    * We implement login by having a ```signIn()``` method in our ```LoginComponent``` (this is triggered by a ```(click)``` event in our template). This method calls a ```login()``` method in our ```AuthService``` - which makes a HTTP request to the backend and gets a JWT in the response body, if successful. We should handle this JWT in the ```AuthService``` and store it in ```localStorage.setItem()```. We should separate layers of concern by returning a simple ```true```/```false``` to the ```LoginComponent```, rather than passing along the response.
    * example
        ```html
            <!-- login.component.html -->
            <form 
                class="form-signin" 
                #form="ngForm" 
                (ngSubmit)="signIn(form.value)">
                ...
                <input 
                    type="email" 
                    id="inputEmail" 
                    name="email" 
                    ngModel 
                    class="form-control" 
                    placeholder="Email address" 
                    required 
                    autofocus>
                ...
                <input 
                    type="password" 
                    id="inputPassword" 
                    name="password" 
                    ngModel 
                    class="form-control" 
                    placeholder="Password" 
                    required>
                ...
                <button 
                    class="btn btn-lg btn-primary btn-block" 
                    type="submit">
                    Sign in
                </button>
            </form>
        ```
        ```typescript
            // login.component.ts
            signIn(credentials: any) {
                this.authService.login(credentials)
                .subscribe(result => { 
                    if (result)
                    this.router.navigate(['/']);
                    else  
                    this.invalidLogin = true; 
                });
            }

            // auth.service.ts
            login(credentials: any) {
                // return this.http.post('/api/authenticate', 
                // JSON.stringify(credentials));

                // Fake implementation of /api/authenticate
                return FakeBackendProvider.mockAuthenticateHttpRequest('/api/authenticate',
                JSON.stringify(credentials)).pipe( 
                map(response => { // use map to convert response to simple truthy/falsy for component (separation of concern)
                    console.log(response);
                    if (response && response.body) {
                    localStorage.setItem('token', response.body.token);
                    return true;
                    }
                    return false;
                }));
            }

            // fake-backend-provider.ts
            private static token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiSlJTbWlmZnkiLCJhZG1pbiI6dHJ1ZX0.CG6ky6D4OgwFHdEDRh_WkEKCsqE07a8uBsnG5FiEOUU';

            static mockAuthenticateHttpRequest(url: string, body: any){
                console.log("mockAuthenticateHttpRequest: " + url);

                let credentials = JSON.parse(body);
                let result: any;

                if (credentials.email === 'james@smith.com' && credentials.password === 'joker') {
                    result = {
                        status: 200,
                        body: {
                            token: this.token
                        }
                    };
                } else {
                    result = {
                        status: 400
                    };
                }

                return of(result);
            } 
        ```
* Implementing Logout
    * All that is required to log the user out is a removal of the token from ```localStorage``` and a redirect to the appropriate publicly accessible page (login, home, etc). In this example app, the 'home' page is publicly accessible and so we don't need a redirect here. 
        * All we need is a 'logout' link element/button on the screen (```home.component.html```) with a ```(click)``` event. When this is raised, the ```authService.logout()``` method is called; here, we simply remove the token from local storage. Now the user is no longer logged-in.
    * example
        ```html
            <!-- home.component.html -->
            <h1>Home Page</h1>
            <p>
            Welcome [NAME]
            </p>
            <ul class="list-group">
                <li class="list-group-item"><a routerLink="/admin">Admin</a></li>
                <li class="list-group-item"><a routerLink="/login">Login</a></li>
                <li class="list-group-item"><a (click)="authService.logout()">Logout</a></li>
            </ul>
        ```
        ```typescript
            // home.component.ts
            export class HomeComponent {
                constructor(private _authService: AuthService) { }

                get authService() {
                    return this._authService;
                }
            }

            // auth.service.ts
            ...
            logout() { 
                localStorage.removeItem('token');
            }
            ...
        ```
* Showing / Hiding Elements 
    * To determine if a user is logged-in, we check to see if there is a token in ```localStorage``` that is valid - meaning that the token's expiration date is still valid.
    * In ```auth.service.ts```, we have an ```isLoggedIn()``` method - here, we want to check the token exists in ```localStorage```; if so, we decode it and confirm that the expiration date is valid. If this is true, the user is logged-in; else they are not.
        * We use the boolean value returned by ```isLoggedIn()``` in the ```HomeComponent``` template. By leveraging the ```*ngIf=""``` directive, we can show/hide elements based on this condition.
    * To work with JWT's in Angular, we use the ```@auth0/angular-jwt``` library.
        * https://www.npmjs.com/package/@auth0/angular-jwt
        * ```npm i @auth0/angular-jwt --save```
    * example
        ```html
            <!-- home.component.html -->
            ...
            <ul class="list-group">
                <li
                    *ngIf="authService.isLoggedIn()"
                    class="list-group-item">
                    <a routerLink="/admin">
                    Admin
                    </a>
                </li>
                <li 
                    *ngIf="!authService.isLoggedIn()"
                    class="list-group-item">
                    <a routerLink="/login">
                    Login
                    </a>
                </li>
                <li 
                    *ngIf="authService.isLoggedIn()"
                    class="list-group-item">
                    <a (click)="authService.logout()">
                        Logout
                    </a>
                </li>
            </ul>
        ```
        ```typescript
            // auth.service.ts
            isLoggedIn() { 
                let jwtHelper = new JwtHelperService();
                let token = localStorage.getItem('token');

                if (!token)
                return false;

                let expirationDate = jwtHelper.getTokenExpirationDate(token);
                let isExpired = jwtHelper.isTokenExpired(token);

                console.log("expirationDate: " + expirationDate);
                console.log("isExpired: " + isExpired);

                return !isExpired;
            }
        ```
* Showing / Hiding Elements Based On User Roles
    * Perhaps we want to show the 'admin' link on the home page to users who have the 'admin' role only; hiding it for users that aren't admins. To do this we use the role property that we have included in our token payload.
    * example
        ```html
        <!-- home.component.html -->
        <ul class="list-group">
            <li
                *ngIf="authService.isLoggedIn() && authService.currentUser.admin"
                class="list-group-item">
                <a routerLink="/admin">
                Admin
                </a>
            </li>
            ...
        </ul>
        ```
        ```typescript
            // auth.service.ts
            ...
            get currentUser() {
                let token = localStorage.getItem('token');
                if (!token) return null;

                let decodedToken = new JwtHelperService().decodeToken(token);
                
                console.log(decodedToken);
                return decodedToken;
            }
            ...
        ```
* CanActive Interface
    * At the moment, there is a vulnerability in our application. On the 'home' page, before logging in, we do not display the link to the admin page on the screen but the user could still navigate there by going to ```/admin``` in the browser search bar.
    * In Angular, we have the concept of 'Route Guards' - these are interfaces that we use to control accessibility to routes in our application. We can apply a Route Guard to any route to protect it from anonymous users.
        * Implementing a route guard:
            1. Create the ```AuthGuard``` service
                * We can create an ```AuthGuard``` service by using ```ng g s services/auth-guard```
                    * Remember to register it as a 'provider' in ```app.module.ts```.
                * By convention, we manually rename this class to ```AuthGuard``` by dropping the ```*Service``` suffix.
                * We then implement the ```CanActivate``` interface's ```canActivate()``` method - checking if the user is logged in or not; if so, we return true; else, we navigate the user back to the ```/login``` page and return false.
            2. Apply the route guard to the desired route
                * In ```app.module.ts```, we can set a route guard on a route using the ```canActivate:``` property of the objects that we supply to ```RouterModule.forRoot([])```.
    * Note, we use Route Guards to protect our routes from anonymous users.
        * So far in this example, we are not protecting the route based on roles. Therefore if the user is logged-in, but not an admin, the application is still vulnerable to them going to ```/admin``` in the browser - this will be fixed in the coming sections.
    * example
        ```typescript
            // auth-guard.service.ts
            export class AuthGuard implements CanActivate {

                constructor(private router: Router, private authService: AuthService) { }

                canActivate() {
                    if (this.authService.isLoggedIn()) 
                    return true;
                    
                    this.router.navigate(['/login']);
                    return false;
                }
            }

            // app.module.ts
            ...
            imports: [
                ...,
                RouterModule.forRoot([
                { 
                    path: '', 
                    component: HomeComponent 
                },
                { 
                    path: 'admin', 
                    component: AdminComponent, 
                    canActivate: [AuthGuard] 
                },
                ...
                ])
            ],
            providers: [
                AuthService,
                AuthGuard
            ],
            ...
        ```
* Redirecting Users After Login
    * At present, when an anonymous user tries to access the ```/admin``` page, they are redirected to ```/login```; if they successfully login, they are then taken to ```/``` ('home'). It is better for user experience to take the user back to the page they orignally tried to access - in this case, ```/admin```.
    * We implement this functionality by suppling a ```returnUrl``` as a query parameter duing the Route Guard ```canActivate()``` navigation.
    * We access this ```returnUrl``` in ```LoginComponent``` when we ```.signIn()```. If the login is successful and the ```returnUrl``` exists, we navigate to the path specified; else, we just navigate to ```/``` ('home') - as we did previously.
    * example:
        ```typescript
            // auth-guard.service.ts
            canActivate(state: ActivatedRouteSnapshot) {
                if (this.authService.isLoggedIn()) 
                    return true;
                
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }} );
                return false;
            }

            // login.component.ts
            ...
            constructor(
                private route: ActivatedRoute, ...) { }

            signIn(credentials: any) {
                this.authService.login(credentials)
                .subscribe(result => { 
                    if (result) {
                        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                        this.router.navigate([returnUrl || '/']);
                    } else {
                        this.invalidLogin = true; 
                    }
                });
            }
            ...
        ```
* Protecting Routes Based On User Roles
    * As previously discussed, the ```/admin``` route should only be accessible to user's with the 'admin' role.
    * To implement this we create a specific Route Guard that checks if the user is an admin (based on their token). We then add this guard to the ```canActivate:``` property in the ```app.module.ts >> imports >> RootModule.forRoot([])``` array.
        * We can apply muliple guards per route, which will be evaluated in sequence.
        * ```ng g s services/admin-auth-guard```
            * Remember to manually register this service as a 'provider' in ```app.module.ts```.
    * example:
        ```typescript
            // admin-auth-guard.service.ts
            export class AdminAuthGuard implements CanActivate {

                constructor(private router: Router, private authService: AuthService) { }

                canActivate() {
                    let user = this.authService.currentUser;
                    if (user && user.admin) return true;
                    // we use 'user' as a condition to check if the value is not-null
                        // if 'user' was null, 'user.admin' would break our application at runtime 

                    this.router.navigate(['/no-access']);
                    return false;
                }
            }

            // app.module.ts
            ...
                imports: [
                    ...,
                    RouterModule.forRoot([
                    { 
                        path: '', 
                        component: 
                        HomeComponent 
                    },
                    { 
                        path: 'admin', 
                        component: AdminComponent, 
                        canActivate: [AuthGuard, AdminAuthGuard] 
                    },
                    ...
                    ])
                ],
                providers: [
                    AuthService,
                    AuthGuard,
                    AdminAuthGuard
                ],
                ...
        ```
* Accessing Protected API Resources
    * In the real-world, our server-side API's will be protected - just like the routes in our client-side application. This means that certain backend endpoints will be restricted to non-anonymous (logged-in) users, who have the correct level of access (role/permissions), so that maliscious users cannot access the API resources.
    * To call such protected API resources from the frontend, we must supply the token in the header of the request. The backend then verifies that we have the correct permissions and grants our request; else a ```401 Unauthorised``` status is returned.
        * this and that...
    * example:
        ```html
            <!-- admin.component.html -->
            ...
            <h3>Orders</h3>
            <ul class="list-group">
                <li 
                    *ngFor="let order of orders"
                    class="list-group-item">
                    {{ order }}
                </li>
            </ul>
            ...
        ```
        ```typescript
            // admin.component.ts
            export class AdminComponent implements OnInit {
                orders: any;

                constructor(private router: Router, private ordersService: OrdersService) {}

                ngOnInit() {
                    this.ordersService.getOrders()
                    .subscribe(orders => this.orders = orders);

                    console.log(this.orders);
                }

                navigateHome() {
                    this.router.navigate(['/']);
                }
            }

            // orders.service.ts
            export class OrdersService {

                constructor(private http: HttpClient) { }

                getOrders() {
                    let token = localStorage.getItem('token');

                    // Set HttpHeaders - Method 1
                    // let headers = new HttpHeaders();
                    // headers = headers.append('Authorization', 'Bearer ' + token);
                    
                    // Set HttpHeaders - Method 2
                    const headers = new HttpHeaders().
                    set('Authorization', 'Bearer ' + token);

                    // return this.http.get('/api/orders', { headers: headers })

                    // Fake implementation of /api/orders
                    return FakeBackendProvider.
                    mockOrdersHttpRequest('/api/orders', { headers: headers }).pipe(
                        map(response => {
                        console.log(response);
                        if (response && response.body)
                            return response.body;
                        else
                            return [];
                        })
                    );
                }
            }

            // fake-backend-provider.ts
            static mockOrdersHttpRequest(url: string, options: any){
                console.log("mockOrdersHttpRequest: " + url);

                let result;
                let headers = options.headers;
                if (headers && headers.get('Authorization') === 'Bearer ' + this.token_admin) {
                    result = {
                        status: 200,
                        body: ['order1', 'order2', 'order3']
                    };
                } else {
                    result = {
                        status: 401
                    };
                }

                return of(result);
            }
        ```
* Recap
    * JSON Web Tokens (JWT's) are used to implement authentication and authorisation in our Angular apps.
    * A JWT is base64 encoded and is comprised of a header, payload and a digital signature 
        * The digital signature is generated using the header, payload and a secret known only by the server.
    * https://jwt.io has a JWT debugger; plus libraries for working with JWT across a wide spectrum of programming languages.
    * Authorisation
        * Client-side
            * When it comes to authorisation, we need to consider what parts of the page should be made visible to anonymous vs logged-in users (this can be done with the ```*ngIf=""``` directive). As well as what permissions/roles this particular user has (admin, etc).
                * We also need to consider what routes are available to the user in our client-side application. We use 'Route Guards' to protect certain routes of application from anonymous users.
        * Server-side
            * On the backend, we want to protect all or a subset of our API resources from unauthorised access. To access these protected API resources from the frontend, we provide the token under the ```Authorization``` property for the header of the request.
                

