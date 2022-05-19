import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private shoppingCartService: ShoppingCartService,
    private db: AngularFireDatabase) { }

  async placeOrder(order: any) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }
  /* 
    TRANSACTION:
    We should use a transaction here^
    In this implementation, it is possible that the second line (for clearing 
    the cart) fails for some unexpected reason while connecting with Firebase.
    A more reliable approach is to have a transaction. This will ensure that 
    during placing an order, an order object is stored AND the corresponding 
    shopping cart is cleared. Either both these operations succeed together 
    or they both will fail. 
  */


}
