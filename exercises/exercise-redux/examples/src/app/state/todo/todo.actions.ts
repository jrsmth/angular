import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models/todo.model';

export const add_todo = createAction(
    '[Todo] Add Todo',
    props<{ content: string }>()
);
export const toggle_todo = createAction(
    '[Todo] Toggle Todo',
    props<{ todo: Todo }>()
);
export const remove_todo = createAction(
    '[Todo] Remove Todo',
    props<{ id: string }>()
);
export const clear_todos = createAction(
    '[Todo] Clear Todos',
); 
