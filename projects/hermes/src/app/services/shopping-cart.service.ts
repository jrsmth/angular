import { ShoppingCart } from './../models/shopping-cart';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Injectable } from '@angular/core';
import { take, Observable } from 'rxjs';

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

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('shopping-carts/' + cartId)
      .valueChanges().pipe(map((x: any) => new ShoppingCart(x.items)));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  private async updateItemQuantity(product: any, quantityChange: number) {
    let cartId = await this.getOrCreateCartId();
    console.log(product);
    let item$ = this.getItem(cartId, product.payload.key);

    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      if(item.key === null){
        // if item deosn't exist (null), set new item
        item$.set({ product: product.payload.val(), quantity: 1 });
        console.log({ product: product.payload.val(), quantity: 1 });

      } else {
        item$.update({ quantity: item.payload.val().quantity + quantityChange }); 
        console.log({ quantity: item.payload.val().quantity + quantityChange });

      }
    })
  }

  async addToCart(product: any) {
    this.updateItemQuantity(product, +1);
  }

  async removeFromCart(product: any) {
    this.updateItemQuantity(product, -1);
  }

}