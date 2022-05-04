import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getCart(cartId: string) {
    return this.db.object('shopping-carts/' + cartId);
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  async addToCart(product: any) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object('shopping-carts/' + cartId + '/items/' + product.payload.key)

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      console.log(item);
      if(item.key) item$.update({ quantity: item.quantity + 1 });
      else item$.set({ product: product, quantity: 1 });
      // TODO: this need fixing!
    })
  }

}
