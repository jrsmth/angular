import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink, RouterLinkWithHref } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ NavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to todos page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    // let index = debugElements.findIndex(de => de.properties['href'] === '/todos'); 
      // ^ Mosh suggests looking at .properties['href'] but it appears to be blank
        // I wonder if things have changed in Angular since then
    let index = debugElements.findIndex(de => de.attributes['routerLink'] === 'todos'); 

    expect(index).toBeGreaterThan(-1);
  });
});
