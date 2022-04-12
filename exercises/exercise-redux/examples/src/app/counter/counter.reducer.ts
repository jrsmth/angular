import { createReducer, on } from '@ngrx/store';
import { increment, decrement, reset } from './counter.actions';
import { INITIAL_STATE } from '../store';

export const counterReducer = createReducer(
  INITIAL_STATE.count,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);