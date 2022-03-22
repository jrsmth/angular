## Overview
* Angular is a framework for building frontend applications using HTML, CSS, JS / TypeScript.
* We use JS-frameworks, like Angular and React, because they make our lives easier: provides reusable utility code, easier to test and allows us to build more complex applications.
* As much as possible, business logic should be encapsulated in the backend - the frontend angular app should just focus on the presentation logic. 
* Node JS is required to run an Angular app - Node JS is a runtime environment for executing JavaScript outside of the browser (server-side JS).
* Angular provides a CLI that is used to create projects, generate boilerplate code and build your packages for deployment.
    * install CLI: 
        * ```npm i -g @angular/cli```
    * new project:
        * ```ng new <PROJECT-NAME>```
    * run app locally (default localhost:4200)
        * ```ng serve```
* Angular comes with a build automation tool, called ```Webpack``` - it allows us to make changes to our code and see these changes takes effect in the browser, without manually stoping and starting the server - Webpack automatically recompiles for you.
    * This feature is called Hot Module Reloading / Replacement
    * Webpack is a tool for creating bundles for our stylesheets & scripts and injecting them into our app at runtime.
* Angular Version History
    * Angular JS - 2010, written in JS, going to die sooner or later
    * Angular 2 - 2016, completely rewritten - using TypeScript
    * Angular 4 - technically Angular 2.4 but the version naming convention was changed
        * Then the developers dropped the version number - now we just have "Angular"
* In VS Code, it is very useful to use the ```Auto-Import``` plugin for TypeScript.
* Generate some HTML quickly (Zen Coding, Emmet)
    * example:
        * ```div.panel.panel-default>div.panel-heading+div.panel-body``` + ```'tab```
            * gives:
                ```html
                    <div class="panel panel-default">
                        <div class="panel-heading"></div>
                        <div class="panel-body"></div>
                    </div>
                ```
* Using double vs single quotes (```" "``` vs ```' '```)
    * Stack Overflow [debate](https://stackoverflow.com/questions/242813/when-should-i-use-double-or-single-quotes-in-javascript)
    * My preference:
        * use single (```' '```) for javascript
        * use double (```" "```) for HTML
    * Don't worry about it too much, be flexible but maintain consistency as much as possible.

<br>

## Angular Project Structure
* Like the ```main``` method in Java, we have a ```src/main.ts``` file that acts as the starting point of our application
* ```polyfills.ts``` imports extra scripts into the app that make up for the fact that most browsers do not support all of the JS features required to run Angular
* Every Node JS project has a ```package.json``` file, like the POM in Java, it specifies the depenedencies required by our application.
* ```protractor.conf.js``` and ```karma.conf.js``` are files that enable us to run tests.
* Inside ```index.html``` we don't have references to style sheets or script modules; instead, Webpack is responsbile for injecting these at runtime - this is what allows for Hot Module Reloading.
    * Scripts and Stylesheet are grouped together as JavaScript ```bundle```'s.

<br>

## Angular Fundamentals
* Angular Building Blocks
    * An Angular app is comprised of one or more components
    * Components
        * A Component in Angular encapulates the data, HTML and logic for a view (an area of the screen that the user sees)
            * example: taking the Udemy website as an example, we could logically group the various sections of the screen into different Angular components - such as the sidebar, navbar, etc (these can be reused across the different pages of our website, or even different apps).

            <br>
            <img src='../resources/udemy_component_ex.png' alt='Udemy Component Example' width='500'>
            
            <br>

        * Every Angular app has a root ```App``` component (```<app-root>```). The rest of the app is a tree of components that branches from this.

            <br>
            <img src='../resources/udemy_component_tree_ex.png' alt='Udemy Component Tree Example' width='500'>
            
            <br>
    * Modules
        * An Angular Module is a group of related components; every app has at least once module called ```AppModule```.
            * As the application grows, you may with to break this module down into smaller modules.
                * In our Udemy website example, we may wish to have a ```Courses``` module which handles all of the course-related components - Courses, Course, Rating, etc.
* Components
    * A Component is a group of related data, HTML and logic for a view (a section of the page that the user sees).
    * There are three steps to use a Component:
        1. Create the Component
            * when naming our component file we use ```<COMPONENT_NAME>.component.ts```
                * example:
                    * ```courses.component.ts``` for a 'Courses Component`
                    * ```course-form.component.ts``` for a 'Course Form` Component, separate words with hypen (```-```)
            * creating the actual component
                * example
                ```javascript
                import { Component } from '@angular/core';
                
                @Component({
                    selector: 'courses', 
                    template: '<h2>Courses</h2>'
                })
                export class CoursesComponent{

                }
                ```
                * Component selector options:
                    * ```selector: 'courses'```: renders ```<courses>```
                        * CSS selection: ```courses {}```
                    * ```selector: '.courses'```: renders ```<div class='courses'>```
                        * CSS selection: ```.courses {}```
                    * ```selector: '#courses'```: renders ```<div id='courses'>```
                        * CSS selection: ```#courses {}```
        2. Register it in a module
            * to register ```CoursesComponent``` in our ```App``` module, we open ```app.module.ts``` and add it as a declaration within ```@NgModule```
                ```javascript
                import { CoursesComponent } from './courses.component';
                ...

                @NgModule({
                declarations: [
                    AppComponent, CoursesComponent
                ],
                ...
                })
                export class AppModule { }
                ```
        3. Add an element in the HTML markup
            * In ```src/index.html``` we have a custom element called ```<app-root>``` - this comes from ```src/app/app.component.ts```. This tag will render the HTML inside ```src/app/app.component.html``` on ```src/index.html```. Therefore to add our ```CoursesComponent``` HTML to the index page, all we have to do is add ```<courses>``` to ```src/app/app.component.html```.
    * It is better practise to use the ```ng``` cli to generate and register components for you.
        * ```ng generate component <COMPONENT_NAME>```
            * shorthand: ```ng g c <COMPONENT_NAME>```
        * note:
            ```clt-` ``` (on Mac) toggles the VS Code terminal
* Templating
    * We can dynamically insert data into our HTML using ``` {{ }} ``` notation (String Interpolation).
        * example:
        ```javascript
        @Component({
            selector: 'app-courses',
            template: '<h2>{{title}}</h2>'
        })
        export class CoursesComponent{
            private _title = "List of Courses";

            get title() {
                return this._title;
            }
        }
        ```
        * this will insert ```List of Courses``` into our DOM.
* Directives
    * Directives are used to manipulate the DOM - we can add/remove elements, change an element's class, etc.
* Services
    * Components should only be responsible for the presentation logic and not for retrieving data from HTTP endpoints -  this responsibility is delegated to a Service class. This is so we do not tightly couple our Component to the HTTP endpoint - promoting reusability of the HTTP endpoint across the app, improving readability of the code and testability when it comes to unit testing the Component (simplicity).
        * example:
            * following on with our ```CoursesComponent``` example, we can add a ```CoursesService``` inside ```src/app/courses/courses.service.ts```
    * Dependency Injection
        * Angular has a dependency injection framework that injects dependencies into our classes at runtime. This decouples the implementation of a dependency from where it is being used and therefore improves Object Oriented design.
            * example: 
                * Our ```CoursesComponent``` is dependent on the ```CoursesService``` but instead of simply instantiating the ```CoursesService``` in our ```CoursesComponent``` constructor, we ask Angular to inject this dependency for us - providing that we register this dependency in our module.
                    * Step 1: Create ```CoursesService```
                    ```javascript
                    // No Decorator, unlike @Component
                    // We would use @Injectable if this class had its own dependencies 
                        // @Component includes @Injectable
                    export class CoursesService {

                        getCourses() {
                            // consume HTTP endpoint...
                            return ["course1", "course2", "course3"];
                        }
                    }
                    ```
                    * Step 2: Add it as a dependency in ```CoursesComponent```
                    ```javascript
                    constructor(service: CoursesService) {
                        this._courses = service.getCourses();
                    }
                    ```
                    * Step 3: Register ```CoursesService``` in ```AppModule```
                    ```javascript
                    @NgModule({
                    declarations: [
                    ...
                    ],
                    imports: [
                        ...
                    ],
                    providers: [CoursesService],
                    bootstrap: [...]
                    })
                    export class AppModule { }
                    ```
                    * alternatively you can specify the registration in the Service class:
                        ```javascript
                        @Injectable({
                            providedIn: 'root'
                        })
                        export class CoursesService { }
                        ```
    * Using the CLI to generate services
        * ```ng generate service <SERVICE-NAME>``` 
            * example: ```ng g s email```
* Author Example Exercise:
    * see ```../exercises/exercise-author/my-soln``` for my initial solution
    * see ```../exercises/exercise-author/mosh-soln``` for Mosh's better solution
        * notes:
            * ```authors``` is an array, so we don't need a authorCount field (just use ```authors.length```)
            * generate html list using ```ul>li``` + ```tab```
            * when using the CLI to generate components, the custom HTML tag are of the form ```app-<COMPONENT_NAME>``` - this is to avoid potential clashes with imported 3rd party components.
                * Mosh takes the view that this ```app-``` prefix should be removed most of the time to improve readability.