import { HttpClientModule } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { of } from 'rxjs';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not 
// provided the TodoService as a dependency to TodosComponent. 
// 
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below. 

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); 
      // ^we need to remove this
        // as ngOnInit is triggered here
          // and so our spy in the test will be too late to have an effect
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should load todos from the server', () => {
    let service = TestBed.inject(TodoService);
    spyOn(service, 'getTodos').and.returnValue(of([ 1, 2, 3 ]));

    fixture.detectChanges();

    expect(component.todos.length).toBe(3);
  });

  it('should load todos from the server, using async()', async(() => {
    let service = TestBed.inject(TodoService);
    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([ 1, 2, 3 ]));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.todos.length).toBe(3);
    })
  }));

  it('should load todos from the server, using fakeAsync()', fakeAsync(() => {
    let service = TestBed.inject(TodoService);
    spyOn(service, 'getTodosPromise').and.returnValue(Promise.resolve([ 1, 2, 3 ]));

    fixture.detectChanges();

    tick();
    expect(component.todos.length).toBe(3);
  }));
});
