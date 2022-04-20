import { Observable, EMPTY, Subject, merge, tap, of } from 'rxjs';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { Router, ActivatedRoute } from '@angular/router';

class RouterStub {
  navigate(params: any) { }
  // we need only include the members that are used in our component under test
}

class ActivatedRouteStub  {
  private subject = new Subject();

  push(value: any) {
    this.subject.next(value);
  }

  get params() {
    return this.subject.asObservable();
  }

  // params: Observable<any> = EMPTY;
  // ^ we define params as a getter so that we can use the subject instead
    // this is required as params (a standard Observable) can't have a new element added to it
      // we need to use rxjs's Subject() instead
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [ 
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should redirect the user to the users page after saving', () => {
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['users']);
  });

  xit('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.inject(Router);
    let spy = spyOn(router, 'navigate');

    //let route: ActivatedRouteStub = TestBed.inject(ActivatedRoute);
    //route.push({ id: 0 });

    // let param = of({ id: 0 });
    // route.params.pipe(tap(param));
    // ^ this method did not work either 

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
