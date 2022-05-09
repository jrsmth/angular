import { ShoppingCartService } from './../services/shopping-cart.service';
import { AppUser } from './../models/app-user';
import { Component, OnInit } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar', // bootstrap-navbar
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.scss']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser | null = null;
  cart$: Observable<ShoppingCart> = EMPTY;

  constructor(private auth: AuthService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
      this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.auth.logout();
  }

}
