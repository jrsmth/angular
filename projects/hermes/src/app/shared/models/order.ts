import { ShoppingCart } from './shopping-cart';

export class Order { 
    // by default, we should use interfaces in our model bc they are more lightweight
        // however, here, we need a class bc we have implementation details

    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();
        
        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price,
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice
            }
          })
    }


}