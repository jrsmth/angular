import { Component, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Subscription, Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'examples';
  courses2: any[] = [];
  subscription: Subscription;
  courses$: Observable<any>; // the $-suffix is used to denote an Observable
  course1$: Observable<any>;
  course4$: Observable<any>;

  // PROPER way of doing things (according to docs)
    // https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md
  coursesRef: AngularFireList<any>;
  courses: Observable<any[]>;

  constructor(private db: AngularFireDatabase) {
    this.courses$ = db.list('/Courses').valueChanges();
    this.course1$ = db.object('/Courses/1').valueChanges();
    this.course4$ = db.object('/Courses/4').valueChanges();

    this.subscription = db.list('/Courses').valueChanges().subscribe(courses => {
      this.courses2 = courses;
      console.log(this.courses2);
    });

    // PROPER way of doing things (according to docs)
      // https://github.com/angular/angularfire/blob/master/docs/rtdb/lists.md
    this.coursesRef = db.list('Courses');
    // Use snapshotChanges().map() to store the key
    this.courses = this.coursesRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, value: c.payload.val() }))
      )
    );
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
    // .set(): replaces entirely
    this.coursesRef.set(course.key, {
      title: course.value.name + ' UPDATED',
      price: 149.99
    });
  
    // .update(): updates only
    this.db.object('/Courses/'+course.key).update({
      title: course.value.name + ' UPDATED2',
      price: 1499.99
    })

  }

  delete(course: any) {
    this.coursesRef.remove(course.key)
      .then(() => console.log("Deleted: " + course.key));
        // returns a Promise, so we use .then()

    // this.coursesRef.remove(course.id); 
      // ^ this will deleteAll b.c course.id is undefined!
  }

  deleteAll(course: any) {
    this.coursesRef.remove();
    // dangerous, v.easy to drop your entire node tree...
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
