import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-soln';
  tweet = {
    body: 'Here is a body of a tweet... blah blah blah',
    isLiked: false,
    likesCount: 999
  }
  // Directives
  courses = ['courses1', 'courses2'];

  onLike() {
    this.tweet.likesCount += (this.tweet.isLiked) ? -1 : +1;
    this.tweet.isLiked = !this.tweet.isLiked;

    // Directives
    if(this.tweet.isLiked)
      this.courses = [];
    else
      this.courses = ['courses1', 'courses2'];
  }
}

