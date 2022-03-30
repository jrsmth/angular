import { FakeBackendProvider } from './../helpers/fake-backend-provider';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable()
export class AuthService {


  constructor(private http: HttpClient) {}

  login(credentials: any) {
    // return this.http.post('/api/authenticate', 
    // JSON.stringify(credentials));

    // Fake implementation of /api/authenticate
    return FakeBackendProvider.mockAuthenticateHttpRequest('/api/authenticate',
      JSON.stringify(credentials)).pipe( 
      map(response => { // use map to convert response to simple truthy/falsy for component (separation of concern)
        console.log(response);
        if (response && response.body) {
          localStorage.setItem('token', response.body.token);
          return true;
        }
        return false;
      }));
  }

  logout() { 
  }

  isLoggedIn() { 
    return false;
  }

}