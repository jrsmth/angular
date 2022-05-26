import { Product } from './product';

export class ShoppingCartItem {
    key: string = '';
    title: string = '';
    imageUrl: string = '';
    price: number = 0;
    quantity: number = 0;

    constructor(init?: Partial<ShoppingCartItem>) { // init is an Object that look like a ShoppingCartItem
        Object.assign(this, init); // .assign() copies those fields into our class and initialises the relevant fields
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}