## Integration Testing
* Overview
    * 3 main uses of Integration Testing in Angular are:
        * Testing templates
        * Testing directives
        * Testing navigation
    * As with Unit Testing, we can structure our tests using the 'Arrange, Act, Assert' methodology.
    * For this section, my examples can be found in ```../exercises/exericse-int-testing/examples```
    * When it comes to organising our unit and integration tests, we can put both unit and integration test in the same ```.spec``` file - but this is noisy and confusing.
        * It is better practise to leave your integration tests in the CLI-generated ```*.spec.ts``` file and move your unit tests to a ```*.unit.spec.ts``` file.
* Set Up
    * The ```TestBed``` class provides us with a number of utility functions for setting up integration tests.
        * In ```beforeEach()```, instead of creating a ```new VoterComponent()``` directly, we ask Angular to create one for us. 
            * We do this by using ```TestBed.configureTestingModule({...})``` and passing our component into it - this is similar to providing it in ```app.module.ts```.
            * Then we use ```TestBed.createComponent(...)``` to return a ```ComponentFixture<VoterComponent>```.
                * The ```ComponentFixture<>``` is a wrapper around our component, that gives us the component instance but also the native (HTML) element, injected dependencies, etc.
    * example:
        ```typescript
            // voter.component.spec.ts
            describe('VoterComponent', () => {
                let component: VoterComponent;
                let fixture: ComponentFixture<VoterComponent>;

                beforeEach(() => {
                    TestBed.configureTestingModule({
                        declarations: [VoterComponent]
                    });

                    fixture = TestBed.createComponent(VoterComponent);
                    component = fixture.componentInstance;
                    // nativeElement = fixture.nativeElement;
                    // debugElement = fixture.debugElement;
                });

                it('', () => {
                });
            });
        ```
    * Note, when we use the Angular CLI to generate a component (```ng g c <COMPONENT>```), a 'spec' file is automatically generated with similar setup code to the above - for running integration tests. 
        * The difference being, the ```beforeEach()``` block is separated in two, with one making an ```async ```call to the file system. The compilation of the component (template, etc) is separated and made ```async``` because it is relatively slow to perform this operation.
            * Note, this ```compileComponents``` call is actually not required because using the Angular CLI, with webpack, handles this for us. Therefore we can use the simpler set up in the example above. In truth, it doesn't matter which ooption you take - if using the Angular CLI, you may as well leave things as they are.
* Testing Property Bindings
    * example:
        ```typescript
            // voter.component.spec.ts
            ...
            it('should render total votes', () => {
                component.othersVote = 20;
                component.myVote = 1;
                fixture.detectChanges(); 
                // ^Angular is not running its usual change detection in the test env
                    // so we need to call it manually

                let de = fixture.debugElement.query(By.css('.vote-count'));
                let el: HTMLElement = de.nativeElement;

                expect(el.innerText).toContain('' + 21);
            });

            it('should highlight the upvote button if I have upvoted', () => {
                component.myVote = 1;
                fixture.detectChanges();

                let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

                expect(de.classes['highlighted']).toBeTruthy();
            });
        ```
    * Note:
        * A Predicate is a function that returns ```true``` if a certain condition is met.
* Testing Event Bindings
    * We don't need to test all of the execution paths through a method, like we did with unit testing. Rather, we should be checking whether the integration between logical components is behaving as expected. 
    * example:
        ```typescript
            // voter.component.spec.ts
            ...
            it('should increase the total votes when I click the upvote button', () => {
                let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
                button.triggerEventHandler('click', null);

                expect(component.totalVotes).toBe(1);
            });
        ```  
        * Note
            * By mistake, I ommited the the ```.``` in ```css('.glyphicon-menu-up')``` and it gave me the following error:
                * ```TypeError: Cannot read properties of null (reading 'triggerEventHandler')```
* Providing Dependencies
    * With Unit Testing, we create a new component object with the ```new``` keyword and then manually passing in the constructor dependencies.
        ```typescript
            ...
            const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
            service = new TodoService(spy);

            component = new TodosComponent(service);
        ```
        * We can't provide dependencies in this way, with Integration Testing, because we use ```TestBed``` to configure Angular to create a component instance for us.
            * Therefore, if we have to inject a service into our component, we need to register it as a provider in our ```TestBed``` testing module.
            * For depencies like ```HttpClient```, we need to register them in the imports arrays of the ```TestBed``` testing module.
                * example:
                    ```typescript
                        // todos.component.spec.ts
                        ...
                        beforeEach(async(() => {
                            TestBed.configureTestingModule({
                                imports: [ HttpClientModule ],
                                declarations: [ TodosComponent ],
                                providers: [ TodoService ]
                            })
                            .compileComponents();
                        }));
                    ```
* Getting Dependencies
    * 




<br>
<br>

    * example:
        ```typescript
            // 
        ```