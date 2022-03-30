import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDciLCJuYW1lIjoiSlJTbWlmZnkiLCJhZG1pbiI6dHJ1ZX0.CG6ky6D4OgwFHdEDRh_WkEKCsqE07a8uBsnG5FiEOUU';

  constructor(private http: HttpClient) {
  }

  login(credentials: any) {
    // return this.http.post('/api/authenticate', 
    // JSON.stringify(credentials));

    // Fake implementation of /api/authenticate
    let response: any;
    if (credentials.email === 'james@smith.com' && credentials.password === 'joker')
      response = {
        status: 200,
        body: {
          token: this.token
        }
      }
    else 
      response = {
        status: 400
      }
    
    return response;
  }

  signIn(credentials: any) {
    let result = this.authService.login(credentials);
    // in mosh's example, result is an Observable that we .subscribe() to
    // here result is just an object {status: ..., body:...}
    if (result.status === 200) {
      this.router.navigate(['/']);
      console.log(result.body);
    } else {
      this.invalidLogin = true; 
    }
  }

  logout() { 
  }

  isLoggedIn() { 
    return false;
  }
}