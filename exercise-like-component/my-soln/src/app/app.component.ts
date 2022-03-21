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
  viewMode = '';
  courses2: any;

  onLike() {
    this.tweet.likesCount += (this.tweet.isLiked) ? -1 : +1;
    this.tweet.isLiked = !this.tweet.isLiked;

    // Directives
    if(this.tweet.isLiked)
      this.courses = [];
    else
      this.courses = ['courses1', 'courses2'];
  }

  // Directives
  onAdd() {
    this.courses2.push(
      { id: this.courses2.length, name: "course" + (this.courses2.length + 1) }
    );
  }

  onRemove(course: any) {
    let index = this.courses2.indexOf(course);
    this.courses2.splice(index, 1);
  }

  loadCourses() {
    this.courses2 = [
      { id: 1, name: "course1"},
      { id: 2, name: "course2"},
      { id: 3, name: "course3"},
    ]
  }

  trackCourse(index: number, course: any) { 
    return course ? course.id : undefined;
  } 
  // now instead of tracking objects by their angular ID
    // we track them by the course.id field
}

