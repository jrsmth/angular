import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { TitlecasePipe } from './titlecase.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    TitlecasePipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
