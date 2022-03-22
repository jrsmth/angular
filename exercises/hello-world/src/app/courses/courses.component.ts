import { CoursesService } from './courses.service';
import { Component } from '@angular/core';

@Component({
    selector: 'app-courses', // extends the HTML vocab with <courses></courses>
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent{
    private _title = "List of Courses";
    private _courses: string[];
    private _isActive: boolean;
    private _address: string;
    private _dummyCourse = {
        title: "The Complete Angular Course",
        rating: 4.9745,
        students: 301023,
        price: 14.99,
        releaseDate: new Date(2016, 3, 1),
        description: "This is a very long description about The Complete Angular Udemy Course, which is fantastic by the way... wait now I've got your attention. Please I need your help, he's had me trapped here for weekss-Wait he's coming back.. oh no, no..."
    };

    constructor(service: CoursesService) {
        this._courses = service.getCourses();
        this._isActive = true;
        this._address = '';
    }

    get title() {
        return this._title;
    }

    get courses() {
        return this._courses;
    }

    get isActive() {
        return this._isActive;
    }

    get address() {
        return this._address;
    }

    set address(value: string) {
        this._address = value;;
    }

    get dummyCourse() {
        return this._dummyCourse;
    }

    save($event: Event){
        $event.stopPropagation(); // prevent Event Bubbling
        console.log('Button was clicked', $event);
    }

    onDivClick($event: Event){
        console.log('Div was clicked');
    }

    submitEmail(email: string){
        console.log(email);
    }

    submitAddress(){
        console.log(this._address);
    }

}

// Component selector options:
    // selector: 'courses' -> <courses>, CSS selection: courses {}
    // selector: '.courses' -> <div class='courses'>, CSS selection: .courses {}
    // selector: '#courses' -> <div id='courses'>, CSS selection: #courses {}
