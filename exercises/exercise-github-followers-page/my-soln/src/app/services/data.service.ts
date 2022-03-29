import { BadInputError } from './../common/errors/bad-input-error';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';    
import { AppError } from '../common/errors/app-error';
import { NotFoundError } from '../common/errors/not-found-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject(String) private url: string, private http: HttpClient) { }

  getAll() {
    return this.http.get(this.url).pipe(
      catchError(this.handleError)); // method reference, not method call;
  }

  private handleError(error: Response) {
    if (error.status === 400) 
      return throwError(new BadInputError())
    else if (error.status === 404) 
      return throwError(new NotFoundError())
    else
      return throwError(new AppError(error)); 
  }

}