import { EditCourseComponent } from './edit-course/edit-course.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'examples';
  isChecked = true;
  colours = [
    { id: 0, name: "Red" },
    { id: 1, name: "Green" },
    { id: 2, name: "Blue" }
  ];
  colourIdSelected = 1;
  minDate = new Date(2017, 0, 1); // 1st Jan 2017
  maxDate = new Date(2017, 8, 1); // 1st Sept 2017
  courses = [
    { id: 1, name: "Beginnner", selected: false },
    { id: 2, name: "Intermediate", selected: false },
    { id: 3, name: "Advanced", selected: false },
  ];
  progress = 0;
  timer: any;
  isLoading = false;

  constructor(private dialog: MatDialog) {
    this.restartTimer();
  }

  restartTimer() {
    this.progress = 0;
    this.timer = setInterval(() => {
      this.progress++;
      if (this.progress == 100) clearInterval(this.timer);
    }, 50); // increment every 50ms, ~5s total

    this.isLoading = true;
    this.getCourses()
      .subscribe(() => this.isLoading = false);
  }

  getCourses() {
    return timer(5000); // Oberservable
  }

  selectCategory(course: any) {
    this.courses
      .filter(c => c != course)
      .forEach(c => c['selected'] = false);

      course.selected = !course.selected;
  }

  onColourChange(id: number) {
      this.colourIdSelected = id;
  }

  onChange(event: any) {
    console.log(event);
  }

  openDialog() {
    this.dialog.open(EditCourseComponent, {
      data: { courseId: 1 }
    })
      .afterClosed()
      .subscribe(result => console.log(result));
  }
}
