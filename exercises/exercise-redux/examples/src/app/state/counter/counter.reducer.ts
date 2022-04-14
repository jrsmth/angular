import { createReducer, on } from '@ngrx/store';
import { decrement, increment, reset } from './counter.actions';

export interface CounterState {
  count: number; 
}

export const initialState: CounterState = {
  count: 0
};

export const counterReducer = createReducer(
  initialState.count,
  on(increment, (state) => state + 1),
  on(decrement, (state) => state - 1),
  on(reset, (state) => 0)
);