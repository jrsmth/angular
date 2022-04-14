import { createReducer, on } from '@ngrx/store';
import { INITIAL_STATE } from '../store';
import { add_todo, remove_todo, toggle_todo } from "./todo.actions"

export const todoReducer = createReducer(
  INITIAL_STATE.todos,
  on(add_todo, (state, { title }) => (state.concat({ id: state.length + 1, title: title }))),
  on(toggle_todo, (state, { id }) => toggleTodo(state, id)),
  on(remove_todo, (state, { id }) => removeTodo(state, id)),
  // on(clear-todos, (state) => ({ todos: [] , lastUpdate: new Date(), count: state.count }))
)

function addTodo(state: any, title: string) {
  var newTodo = { id: state.todos.length + 1, title: title };

  // Instead of the push() method, we use the concat() method because the former mutates
  // the original array, whereas the latter returns a new array. 
  state.todos = state.todos.concat({ id: state.todos.length + 1, title: title }),
  state.lastUpdate = new Date()

  return state;
}

function toggleTodo(state: any, id: string) {
  return state;
}

function removeTodo(state: any, id: string) {
  return state;
}

function clearTodos(state: any) {
  state.todos = [],
  state.lastUpdate = new Date()

  return state;
}