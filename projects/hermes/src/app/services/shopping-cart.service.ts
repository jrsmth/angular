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

  async addToCart(product: any) {
    this.updateItem(product, +1);
  }

  async removeFromCart(product: any) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items').remove();
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

  private async updateItem(product: any, quantityChange: number) {
    console.log(product);
    let cartId = await this.getOrCreateCartId();
  
    // :product can be flat shopping cart item or nested native product
    let productId = (product.payload?.key || product.key);
    let title = (product.payload?.val().title || product.title);
    let imageUrl = (product.payload?.val().imageUrl || product.imageUrl)
    let price = (product.payload?.val().price || product.price)

    let item$ = this.getItem(cartId, productId);
    item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
      let quantity = (item.payload.val()?.quantity || 0) + quantityChange
      if (quantity === 0) item$.remove();
      else item$.update({
        title: title,
        imageUrl: imageUrl,
        price: price,
        quantity: quantity
      })
    });

    // item$.snapshotChanges().pipe(take(1)).subscribe((item: any) => {
    //   if(item.key === null){
    //     // if item deosn't exist (null), set new item
    //     item$.set({ product: product.payload.val(), quantity: 1 });
    //     console.log({ product: product.payload.val(), quantity: 1 });
    //   } else {
    //     item$.update({ quantity: item.payload.val().quantity + quantityChange }); 
    //     console.log({ quantity: item.payload.val().quantity + quantityChange });
    //   }
    // });
  }

}