import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IAppState } from '../state/store';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../state/counter/counter.actions';

@Component({
  selector: 'counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  count$: Observable<number>;
  // counter = 0;
 
  constructor(private store: Store<IAppState>) {
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
