import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  @Input('is-favorite') isFavorite = false;
  @Output('change') change = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    let message = '<favorite> clicked from FavoriteComponent';
    console.log(message);
    this.isFavorite = !this.isFavorite;
    this.change.emit({message: message, isFavorite: this.isFavorite});
  }

}

export interface FavoriteChangedEventArgs {
  message: string,
  isFavorite: boolean
}
