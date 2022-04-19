import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { EMPTY, from, of, throwError } from 'rxjs';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) })
    service = new TodoService(spy);

    component = new TodosComponent(service);
  });

  it('should set todos property with items returned from the server', () => {
    let todos = [1,2,3,4];

    // Arrange
    spyOn(service, 'getTodos').and.callFake(() => {
      return of(todos)
    })

    // Act
    component.ngOnInit();

    // Assert
    expect(component.todos).toBe(todos);
  });

  it('should call the server to save the changes when a new todo item is added', () => {
    let spy = spyOn(service, 'add').and.callFake(t => {
      return EMPTY; // we don't care about what is returned in this test
    })

    component.add();

    expect(spy).toHaveBeenCalled();
  })

  it('should add the new todo returned from server', () => {
    let todo = { id: 1 };
    spyOn(service, 'add')
      .and.returnValue(from([todo]));

    component.add();

    expect(component.todos.indexOf(todo))
      .toBeGreaterThan(-1);
  })

  it('should set the message property if server returns an error when adding a new todo', () => {
    let error = 'error from the server';
    spyOn(service, 'add')
      .and.returnValue(throwError(error));

    component.add();

    expect(component.message).toBe(error);
  })

  xit('should call the server to delete a todo item if the user confirms', () => {
    let id: number = 1;

    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(id);

    expect(spy).toHaveBeenCalledWith(id);
  })

  xit('should NOT call the server to delete a todo item if the user cancels', () => {
    let id: number = 1;

    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(service, 'delete').and.returnValue(EMPTY);

    component.delete(id);

    expect(spy).not.toHaveBeenCalled();
  })

});