import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Subscription } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: any[] = []; // should clean up services and README, to use the products interface and do things properly (by EO-section)
    // ^^ acutally don't bother, this is not production code and there isn't time to perfect it
  filteredProducts: any[] = [];
  categorySelected: string | null = '';
  cart: any;
  subscription: any;

  constructor(
    private shoppingCartService: ShoppingCartService,
    route: ActivatedRoute,
    productService: ProductService) { 
    productService.getAll().snapshotChanges().pipe(
      switchMap((products: any) => {
        this.products = products;
        return route.queryParamMap;
      })
    ).subscribe(params => {
        this.categorySelected = params.get('category');

        this.filteredProducts = (this.categorySelected) ? 
          this.products.filter(p => p.payload.val().category === this.categorySelected) :
          this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges()
      .subscribe(cart => this.cart = cart);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
