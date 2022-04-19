## Unit Testing
* Automated Testing is where write additional code to test aspects of our application. We do this to reduce the amount of manual testing and to test aspects of the app that manual testing could not reach.
    * Automated Testing speeds up the testing process, allows us to increase the depth and coverage of our tests and ultimately, delivers higher quality software. 
        * It is worth the time investment.
* In general, there are three types of automated tests
    * Unit
        * Unit Testing is where we test the smallest encapsulated units of our application, in isolation. 
            * This is without databases, API calls, etc
            * Typically, this means testing the output of individual methods, for given inputs.
    * Integration
        * Integration Testing is where we test mutliple units of our application, working together.
    * End-to-end (E2e)
        * E2e Testing is where we test a path through the whole application.
* Example
    * In Angular, we might want to test a VoteComponent (see image below).
        * The VoteComponent is a TypeScript class, with a template attached. 
        * In Unit Testing, we can test the individual methods of this TS class (```upVote()```) and check that the properties (```totalVotes```) have been updated accordingly. We do this disregarding the template; if the ```upVote()``` method was not bound to the ```(click)``` event in the template, we could not tell by Unit Testing.
        * We use Integration Testing for this: we test that the button, when clicked, triggers the method in the TS class and that the correct behaviour occurs. This involves starting up the test in an Angular environment, associating the TypeScript class with it's template.
        * Put simply:
            * Unit Test: TypeScript class only
            * Integration Test: TypeScript class + template only 

        <br>

        <img src="../resources/unit_vs_int_ex.png" alt="Unit vs Integration Example" width="500">

        <br>

* Examples
    * My examples for this section can be found in ```../exercises/exercise-unit-testing/examples```.
* Unit Testing Fundamentals
    * Tests are first class citizens and so should we should create them with best practise in mind. This includes:
        * Single responsibility
        * ~10 lines of code or less (small, neat)
        * Proper naming (self-explanatory)
    * Karma is the test runner in Angular
        * We can start our tests with ```ng test```
        * ```*.spec.ts``` is the naming convention for  testing files. Karma is looking to start tests in files that follow this convention.
        * Karma offers us Hot Module Reloading (or at least an equivalent of it) - when developing Angular applications, we can take advantage of this by having one terminal/browser window open with Karma running our tests; everytime we save a file, our tests will be re-run and we will quickly see if anything breaks.
    * Jasmine is the framework that our unit tests are written in. It comes with many functions but the two that we use most frequently are:
        * ```describe()``` - defines a 'suite', a group of related tests
        * ```it()``` - defines a 'spec', an individual test
    * example:
        ```typescript
            // compute.ts
            export function compute(number: number) {
                if (number < 0)
                    return 0; 

                return number + 1;
            }

            // compute.spec.ts
            import { compute } from "./compute";

            describe('compute', () => {
                it('should return 0 if input is negative', () => {
                    const result = compute(-1);
                    expect(result).toBe(0);
                })
            })
        ```
* Working with Strings and Arrays
    * If we want to test the outputs of methods that are strings and arrays, the tests are very fragile if we test for the exact string/array that is outputted. We can increase the stability by looking to see if the string/array contains the element that we want - using ```.toContain()```.
    * example:
        ```typescript
            // greet.ts
            export function greet(name: string) { 
                return 'Welcome ' + name; 
            }

            // greet.spec.ts
            import { greet } from "./greet";

            describe('greet', () => {
                it('should include the name in the message', () => {
                    expect(greet('James')).toContain('James');
                })
            })
        ```
* Set Up & Tear Down
    * Using ```beforeEach()``` we can initialise (Arrange) our component before running each test, with only a single block of code. This means that we don't have to do this in each test - leading to cleaner code.
        * There is also a ```afterEach()``` function, where we can tear down and clean up our component if required.
        * Furthermore, we have ```beforeAll()``` and ```afterAll()```, which is only executed once, before/after all the tests.
    * example:
        ```typescript
            // vote.component.ts
            export class VoteComponent { 
                totalVotes = 0; 

                upVote() { 
                    this.totalVotes++;
                }

                downVote() { 
                    this.totalVotes--;
                }
            }

            // vote.component.spec.ts
            describe('VoteComponent', () => {
                let component: VoteComponent;

                beforeEach(() => {
                    // Arrange - initialise the system under test
                    component = new VoteComponent();
                })

                it('should increment totalVotes when up-voted', () => {
                    // Act - call the actual method/function
                    component.upVote();

                    // Assert - check the result equals what is expected
                    expect(component.totalVotes).toBe(1);
                });

                it('should decrement totalVotes when down-voted', () => {
                    // Act - call the actual method/function
                    component.downVote();

                    // Assert - check the result equals what is expected
                    expect(component.totalVotes).toBe(-1);
                });
            });
        ```






<br>
<br>
    * example:
        ```typescript
            //
        ```


