import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  private _isActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  get isActive(){
    return this._isActive;
  }

  set isActive(value: boolean){
    this._isActive = value
  }

  toggleActive(){
    this._isActive = !this._isActive;
  }

}
