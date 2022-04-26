import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService { // note, we use singular-terminology when working with Angular Services; it's UserService, not UsersService

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    this.db.list('/products').snapshotChanges().subscribe(
      (res: any) => console.log(res) // err!
    );
    return this.db.list('/products').snapshotChanges();
  }

  create(product: any) {
    return this.db.list('/products').push(product);
  }
}
