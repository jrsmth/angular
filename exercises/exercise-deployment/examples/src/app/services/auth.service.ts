import { FakeBackendProvider } from './../helpers/fake-backend-provider';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    localStorage.removeItem('token');
  }

  isLoggedIn() { 
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token)
      return false;

    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);

    console.log("expirationDate: " + expirationDate);
    console.log("isExpired: " + isExpired);

    return !isExpired;
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    let decodedToken = new JwtHelperService().decodeToken(token);
    
    console.log(decodedToken);
    return decodedToken;
  }

}