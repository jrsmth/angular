import { AuthorsService } from '../authors.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  private _authors: string[];

  constructor(service: AuthorsService) {
    this._authors = service.getAuthors();
   }

  ngOnInit(): void {
  }

  get authors() {
    return this._authors;
  }

}
