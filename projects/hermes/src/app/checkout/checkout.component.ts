import { Observable, EMPTY } from 'rxjs';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cart$: Observable<ShoppingCart> = EMPTY;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit(): Promise<void> {
      this.cart$ = await this.shoppingCartService.getCart();
  }
  
}    
