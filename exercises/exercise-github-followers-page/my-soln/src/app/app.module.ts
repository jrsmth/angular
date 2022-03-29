import { GitHubFollowersService } from './services/github-followers.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppErrorHandler } from './common/errors/app-error-handler';
import { GithubFollowersComponent } from './github-followers/github-followers.component';

@NgModule({
  declarations: [
    AppComponent,
    GithubFollowersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    GitHubFollowersService,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
