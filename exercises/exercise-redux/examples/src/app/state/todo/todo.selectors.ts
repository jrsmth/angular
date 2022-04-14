import { createSelector } from '@ngrx/store';

const selectTodo = (state: any) => state.hasOwnProperty('todo') ? state.todo : ''; // select feature

export const selectedTodos = createSelector( // select property
    selectTodo,
  (state: any) => {
    return state.hasOwnProperty('todos') ? state.todos : '';
  }
);

export const selectedLastUpdate = createSelector( // select property
    selectTodo,
  (state: any) => {
    return state.hasOwnProperty('lastUpdate') ? state.lastUpdate : '';
  }
);
