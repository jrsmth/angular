import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService { // note, we use singular-terminology when naming our service layer in Angular; it's UserService, not UsersService

  constructor(private db: AngularFireDatabase) { }

  get(productId: string) {
    return this.db.object('/products/' + productId);
  }

  getAll() {
    return this.db.list('/products');
  }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }

  update(productId: string, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }
}
