import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoService } from '../services/todo.service';
import { IAppState } from '../state/store';
import { add_todo } from '../state/todo/todo.actions';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos$: Observable<any>;
  // lastUpdate$: Observable<Date>;

  // Read the comment in TodoService
  // constructor(public service: TodoService) { }
 
  constructor(private store: Store<IAppState>, public service: TodoService) {
    this.todos$ = store.select('todos');
    // this.lastUpdate$ = store.select('lastUpdate');
  }

  addTodo(input: HTMLInputElement) {
    // Reject empty inputs
    if (!input.value) return; 

    alert('hit');

    // this.service.addTodo(input.value);
    this.store.dispatch(add_todo({ title: input.value }));

    // reset form
    input.value = '';
    input.focus();
  }

  toggleTodo(todo: any) {
    // this.service.toggleTodo(todo);
  }

  removeTodo(todo: any) {
    // this.service.removeTodo(todo);
  }
}
