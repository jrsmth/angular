import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'bs-navbar', // bootstrap-navbar
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser | null = null;
  shoppingCartItemCount: number = 0;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);

      let cart$ = await this.shoppingCartService.getCart();
      cart$.valueChanges().subscribe((cart: any) => {
        this.shoppingCartItemCount = 0;
        for (let productId in cart.items)
          this.shoppingCartItemCount += cart.items[productId].quantity;
      })
  }

  logout() {
    this.auth.logout();
  }

}
