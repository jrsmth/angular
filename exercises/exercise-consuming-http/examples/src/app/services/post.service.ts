import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends DataService {

  constructor(http: HttpClient) { 
    super('https://jsonplaceholder.typicode.com/posts', http);
      // super() is required bc to create an instance of a derrived class
        // we need to create an instance of the base class
  }

}
