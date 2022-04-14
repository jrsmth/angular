import { CounterState } from './../state/counter/counter.reducer';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../state/app.state';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter/counter.actions';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  count$: Observable<CounterState>;
  // counter = 0;
 
  constructor(private store: Store<AppState>) {
    // Connect `this.count$` stream to the current store `count` state
    this.count$ = store.select('count');
  }

  increment() {
    // Dispatch an increment action
    this.store.dispatch(increment());

    // this.counter++; // typical Angular, without using Redux
  }

  decrement() {
    // Dispatch an decrement action
    this.store.dispatch(decrement());
  }
 
  reset() {
    // Dispatch a reset action
    this.store.dispatch(reset());
  }

}
