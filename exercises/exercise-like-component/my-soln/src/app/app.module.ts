import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LikeComponent } from './like/like.component';
import { InputFormatDirective } from './input-format.directive';

@NgModule({
  declarations: [
    AppComponent,
    LikeComponent,
    InputFormatDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
