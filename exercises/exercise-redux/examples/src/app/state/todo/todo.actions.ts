import { createAction, props } from '@ngrx/store';

export const add_todo = createAction(
    '',
    props<{ title: string }>()
);
export const toggle_todo = createAction(
    '',
    props<{ id: string }>()
);
export const remove_todo = createAction(
    '',
    props<{ id: string }>()
);
export const clear_todos = createAction(
    '',
); 


export const homeScore = createAction('[Scoreboard Page] Home Score');
export const awayScore = createAction('[Scoreboard Page] Away Score');
export const resetScore = createAction('[Scoreboard Page] Score Reset');