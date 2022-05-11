import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {

    constructor(private items: ShoppingCartItem[]) {}

    get productIds() {
        return Object.keys(this.items); 
        // Object.keys() returns all of the fields of an Object as an array
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity
        return count;
    }
}