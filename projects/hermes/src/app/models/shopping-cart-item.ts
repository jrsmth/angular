import { Product } from './product';

export class ShoppingCartItem {
    key: string = '';
    title: string = '';
    imageUrl: string = '';
    price: number = 0;
    quantity: number = 0;

    // constructor(public product: Product, public quantity: number) { }

    get totalPrice() {
        return this.price * this.quantity;
    }
}