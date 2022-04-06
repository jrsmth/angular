import { bounceOutLeftAnimation, fadeInAnimation } from './../animations';
import { transition, animate, style, trigger, useAnimation, query, animateChild, group, stagger } from '@angular/animations';
import { Component } from '@angular/core';
import { fade, slide } from '../animations';

@Component({
  selector: 'todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  animations: [
    // fade,
    // slide,
    trigger('todosAnimation', [
      transition(':enter', [
        group([
          query('h1', [ // CSS selector (#id, .class, elem), or Psuedo-selector
          style({ transform: 'translateY(-20px) '}),
          animate(250)
        ]),
        query('@todoAnimation', 
          stagger(200, animateChild())) 
        ])
      ])
    ]),
    trigger('todoAnimation', [
      transition(':enter', [
        useAnimation(fadeInAnimation, {
          params: {
            duration: '500ms'
          }
        })
      ]),
      transition(':leave', [
        style({ backgroundColor: 'crimson' }),
        animate(1000),
        useAnimation(bounceOutLeftAnimation)
      ])
    ])
  ]
})
export class TodosComponent {
  items: any[] = [
    'Wash the dishes', 
    'Call the accountant', 
    'Apply for a car insurance'];

  addItem(input: HTMLInputElement) {
    this.items.splice(0, 0, input.value);
    input.value = ''; 
  }

  removeItem(item: any) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }

  animationStarted($event: any) {
    console.log($event);
  }

  animationDone($event: any) {
    console.log($event);
  }

}
