import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'examples';
  courses: any[] = [];
  subscription: Subscription;
  courses$: Observable<any>; // the $-suffix is used to denote an Observable
  course1$: Observable<any>;
  course4$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('/Courses').valueChanges();
    this.course1$ = db.object('/Courses/1').valueChanges();
    this.course4$ = db.object('/Courses/4').valueChanges();

    this.subscription = db.list('/Courses').valueChanges().subscribe(courses => {
      this.courses = courses;
      console.log(this.courses);
    })
  }

  add(course: HTMLInputElement){
    const coursesRef = this.db.list('/Courses');
    coursesRef.push({
      name: course.value,
      price: 149.99,
      isLive: true,
      sections: [
        { title: 'Components' },
        { title: 'Directives' },
        { title: 'Templates' }
      ]
    });
    course.value = '';
  }

  update(course: any) {
    const coursesRef = this.db.list('/Courses');

    // .set(): replaces
    coursesRef.set('1', course + ' UPDATED');
    // get the index of the course in the List
      // example: https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md
  
    // .update(): updates

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
