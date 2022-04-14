import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { counterReducer } from './state/counter/counter.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatComponentsModule } from './mat-components/mat-components.module';
import { CounterComponent } from './counter/counter.component';
import { TodoDashboardComponent } from './todo-dashboard/todo-dashboard.component';
import { todoReducer } from './state/todo/todo.reducer';
import { environment } from 'src/environments/environment';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    TodoDashboardComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ count: counterReducer , todo: todoReducer }),
    BrowserAnimationsModule,
    MatComponentsModule,
    FormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    })
  ],
  providers: [
    TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
