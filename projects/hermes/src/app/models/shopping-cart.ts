import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }
    
    get productIds() {
        return Object.keys(this.itemsMap); 
        // Object.keys() returns all of the fields of an Object as an array
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.items)
            count += this.items[productId].quantity
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    getQuantity(product: any) {  
        let productId = product.key;
        let item = this.itemsMap[productId];
        return item ? item.quantity : 0;
    }
}