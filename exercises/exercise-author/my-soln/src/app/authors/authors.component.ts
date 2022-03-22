import { AuthorsService } from './../authors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  private _authors: string[];
  private _authorCount: number;

  constructor(service: AuthorsService) { 
    this._authors = service.getAuthors();
    this._authorCount = this._authors.length;
  }

  ngOnInit(): void {
  }

  get authors() {
    return this._authors
  }

  get authorCount() {
    return this._authorCount;
  }

}
