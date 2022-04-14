import { CounterState } from "./counter/counter.reducer";
import { TodoState } from "./todo/todo.reducer";

export interface AppState {
  todo: TodoState;
  count: CounterState;
}

