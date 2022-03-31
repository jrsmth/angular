import { FakeBackendProvider } from './../helpers/fake-backend-provider';
import { map } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders() {
    let token = localStorage.getItem('token');

    // Set HttpHeaders - Method 1
    // let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Bearer ' + token);
    
    // Set HttpHeaders - Method 2
    const headers = new HttpHeaders().
      set('Authorization', 'Bearer ' + token);

    // return this.http.get('/api/orders', { headers: headers })

    // Fake implementation of /api/orders
    return FakeBackendProvider.
      mockOrdersHttpRequest('/api/orders', { headers: headers }).pipe(
        map(response => {
          console.log(response);
          if (response && response.body)
            return response.body;
          else
            return [];
        })
      );
  }
}
