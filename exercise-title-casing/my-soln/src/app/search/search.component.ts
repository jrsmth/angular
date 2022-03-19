import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private _filmName = "";

  constructor() { }

  ngOnInit(): void {
  }

  get filmName() {
    return this._filmName;
  }

  set filmName(value: string) {
    this._filmName = value;
  }

}
