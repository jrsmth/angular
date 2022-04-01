## Deployment
* Deployment Preparation
    * Mosh's example code for this section did not work for me, as much of it has been deprecated.
        * Therefore, I will duplicate and reuse the code from the 'Authentication and Authorisation' section for my example - this can be found in ```../exercises/exercise-deploy/examples```.
    * Optimisation Techniques 
        * There are techniques to reduce the size of your code in order to make deployment smoother. These include:
            * Minification - remove all comments and whitespace
            * Uglification - replacing long, descriptive variable names with short, cryptic ones.
            * Bundling - combining multiple JS files together into a single, larger one; reducing the number of requests that have to be made to download parts of the application.
            * Dead-Code Elimination - removing any sections of code or dependencies that are not actually used anywhere in our application.
            * Ahead-Of-Time (AOT) Compilation
        * The Angular CLI offers us a command to use all of these optimisation techniques: 
            * ```ng build```
                * Note, the ```--prod``` flag has been deprecated; 'production' is now the default config and so we can omit it and still get the optimised build.
* JIT vs AOT Compilation
    * Unlike with the ```javac``` Java Compiler, which converts Java code into bytecode, the Angular compiler converts JavaScript code into JavaScript code.
    * Just-In-Time (JIT) Compilation - this is where compilation happens at runtime. This is fine when we are developing the application on our local machine but is inefficient for production, as every user will have to compile the application when they access it. 
    * Ahead-Of-Time (AOT) Compilation - this is where compilation happens ahead of deployment, so that users do not have to compile the application when they access it. The benefits of AOT compilation include:
        * Faster start up (don't have to wait to compile)
        * Smaller bundle size (Angular Compiler doesn't need to be included in the 'vendor' bundle)
        * Catch template error earlier (JIT means that template errors are only caught at runtime)
        * Better security (less vulnerable to injection attacks in our app)
* Building Applications With Angular CLI
    * In our ```package.json``` file, we have a ```@angular/compiler-cli``` dependency.
    * Using the ```ng build``` command builds our application into a deployable package and applies the optimisation techniques discussed above. 
        * This creates a ```/dist``` folder (~'distributable/distribution') - containing the ```index.html```, stylesheet and JS bundles.
* Environments
    * In ```/src/environments``` we define configuration for our Angular app depending on which environment we are running in (dev, staging, prod, etc).
        * It is akin to ```app.yaml``` in Spring-world; where we can supply different profiles at runtime, to modify the behaviour of our application.
    * For example, we may wish to change the colour of a component to signify that a 'test user' is looking at the version of the app running in the 'test environment' - this confirms that they are not going to accidentally modify the production instance.
    * To use an environment variable, we first define it in the desired ```src/environments/environment.<ENVIRONMENT_NAME>.ts``` file.
        * Next, in the desired component, we ```import { environment } from 'src/environments/environment';``` and reference the environment variable using ```varName = environment.varName;```. We are then free to use this in our component; such as in a style binding expression in the template.
            * Finally, we use ```ng build/serve --configuration <ENVIRONMENT_NAME>``` to specify which environment to use in our build. 
                * Alternatively, we can use ```-c``` alias for ```--configuration```.
    * Note:
        * ```ng build``` selects the 'production' environment by default
        * ```ng serve``` selects the 'development' environment by default
        * To use a custom ```environment.<ENVIRONMENT_NAME>.ts``` file, you must register it in ```/angular.json```; this is under both the '```configuration```' (```ng build```) and '```serve```' (```ng serve```) sections.
            * See the example below.
        * The Angular docs refer to the 'staging' environment file using ```environment.stage.ts``` - not 'environment.staging.ts'.
            * It appears the file names use a shorthand of the full environment name - like ```environment.prod.ts``` vs 'production'.
    * example:
        ```html
            <!-- home.component.html -->
            ...
            <p 
                [style.color]="textColor"
                *ngIf="authService.isLoggedIn()">
                Welcome {{ authService.currentUser.name }}
            </p>
        ```
        ```typescript
            // home.component.ts
            import { environment } from 'src/environments/environment';
            ...
            export class HomeComponent {
                textColor = environment.textColor;
                ...
            }

            // environment.ts
            export const environment = {
                production: false,
                textColor: 'blue'
            };

            // environment.prod.ts
            export const environment = {
                production: true,
                textColor: 'red'
            };

            // environment.stage.ts
            export const environment = {
                production: false,
                textColor: 'green'
            };

        ```
        ```json
            // angular.json
            "architect": {
                "build": {
                "builder": "...",
                "options": {
                    "..."
                },
                "configurations": {
                    "production": {
                    "budgets": [
                        {
                        "type": "initial",
                        "maximumWarning": "500kb",
                        "maximumError": "1mb"
                        },
                        {
                        "type": "anyComponentStyle",
                        "maximumWarning": "2kb",
                        "maximumError": "4kb"
                        }
                    ],
                    "fileReplacements": [
                        {
                        "replace": "src/environments/environment.ts",
                        "with": "src/environments/environment.prod.ts"
                        }
                    ],
                    "outputHashing": "all"
                    },
                    "development": {
                    "buildOptimizer": false,
                    "optimization": false,
                    "vendorChunk": true,
                    "extractLicenses": false,
                    "sourceMap": true,
                    "namedChunks": true
                    },
                    "staging": {
                    "fileReplacements": [
                        {
                        "replace": "src/environments/environment.ts",
                        "with": "src/environments/environment.stage.ts"
                        }
                    ]
                    }
                },
                "defaultConfiguration": "production"
                },
                "serve": {
                "builder": "@angular-devkit/build-angular:dev-server",
                "configurations": {
                    "production": {
                    "browserTarget": "examples:build:production"
                    },
                    "development": {
                    "browserTarget": "examples:build:development"
                    },
                    "staging": {
                    "browserTarget": "examples:build:staging"
                    }
                },
                "defaultConfiguration": "development"
                }
        ```
* 


