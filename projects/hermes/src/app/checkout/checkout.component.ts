import { OrderService } from './../services/order.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  shipping: any = {}; 
  cart: ShoppingCart | undefined;
  subscription: Subscription | undefined;


  constructor(
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService) {}

  async ngOnInit(): Promise<void> {
      let cart$ = await this.shoppingCartService.getCart();
      cart$.subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  
  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      shipping: this.shipping,
      items: this.cart?.items.map(i => {
        return {
          product: {
            title: i.title,
            imageUrl: i.imageUrl,
            price: i.price,
          },
          quantity: i.quantity,
          totalPrice: i.totalPrice
        }
      })
    };

    this.orderService.storeOrder(order);
  }
}    
