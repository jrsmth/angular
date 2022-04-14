import { remove_todo, toggle_todo } from './../state/todo/todo.actions';
import { selectedTodos } from './../state/todo/todo.selectors';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { AppState } from '../state/app.state';
import { add_todo } from '../state/todo/todo.actions';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos$: Observable<Todo[]>;
  // lastUpdate$: Observable<Date>;

  // Read the comment in TodoService
  // constructor(public service: TodoService) { }
 
  constructor(private store: Store<AppState>, public service: TodoService) {
    this.todos$ = store.select(selectedTodos);
    // this.lastUpdate$ = store.select('lastUpdate');
  }

  addTodo(input: HTMLInputElement) {
    // Reject empty inputs
    if (!input.value) return; 

    // this.service.addTodo(input.value);
    this.store.dispatch(add_todo({ content: input.value }));

    // reset form
    input.value = '';
    input.focus();
  }

  toggleTodo(todo: Todo) {
    // this.service.toggleTodo(todo);
    this.store.dispatch(toggle_todo({ todo: todo }));
  }

  removeTodo(todo: Todo) {
    this.store.dispatch(remove_todo({ id: todo.id }));
  }
}
