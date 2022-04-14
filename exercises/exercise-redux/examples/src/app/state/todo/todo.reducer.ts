import { createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';
import { add_todo, remove_todo, toggle_todo, clear_todos } from "./todo.actions"

export interface TodoState {
  todos: Todo[];
  lastUpdate: Date; 
}

export const initialState: TodoState = {
  todos: [],
  lastUpdate: new Date()
};

export const todoReducer = createReducer(
  initialState,
  on(add_todo, (state, { content }) => ({
    ...state,
    todos: [...state.todos, { id: Date.now().toString(), content: content, isCompleted: false}],
    lastUpdate: new Date()
  })),
  on(toggle_todo, (state, { todo }) => ({
    ...state,
    todos: [
      ...state.todos.slice(0, state.todos.indexOf(todo)), // get the todos before this one
      { id: todo.id, content: todo.content, isCompleted: !todo.isCompleted}, // update this todo
      ...state.todos.slice(state.todos.indexOf(todo) + 1) // get the todos after this one
    ], 
    lastUpdate: new Date()
  })),
  on(remove_todo, (state, { id }) => ({
    ...state,
    todos: [...state.todos.filter(t => t.id !== id)],
    lastUpdate: new Date()
  })),
  on(clear_todos, (state) => ({
    ...state,
    todos: [],
    lastUpdate: new Date()  
  }))
)

