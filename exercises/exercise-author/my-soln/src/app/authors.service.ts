import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor() { }

  getAuthors() {
    // fetch data from API...
    return ["J.R.R Tolkien", "J.K Rowling", "Frank Herbert"];
  }

}
