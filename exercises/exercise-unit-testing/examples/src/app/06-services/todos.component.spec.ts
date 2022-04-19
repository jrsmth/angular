import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { of } from 'rxjs'

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
});