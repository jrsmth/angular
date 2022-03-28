import { BadInputError } from './../common/errors/bad-input-error';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';    
import { AppError } from '../common/errors/app-error';
import { NotFoundError } from '../common/errors/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(this.url);
  }

  createPost(post: any) {
    return this.http.post(this.url, JSON.stringify(post)).pipe(
      catchError( (error: Response) => {
        if (error.status === 400) 
          return throwError(new BadInputError(error))

        return throwError(new AppError(error));        
      }));
  }

  updatePost(post: any) {
    return this.http.put(this.url + '/' + post.id, JSON.stringify(post));
  }

  deletePost(id: number){
    return this.http.delete(this.url + '/' + id ).pipe(
      catchError( (error: Response) => {
        if (error.status === 404) 
          return throwError(new NotFoundError())

        return throwError(new AppError(error));        
      }));
    }

}
