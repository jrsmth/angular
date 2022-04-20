import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'; 

@Injectable()
export class TodoService { 
  constructor(private http: HttpClient) { 
  }

  add(todo: any) {
    return  this.http.post('...', todo);
  }

  getTodos() { 
    return this.http.get('...');
  }

  getTodosPromise() {
    return this.http.get('...').toPromise();
  }

  delete(id: number) {
    return this.http.delete('...');
  }
}