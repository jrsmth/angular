import { ShoppingCartService } from './../services/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, Subscription, Observable, EMPTY } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any[] = []; // should clean up services and README, to use the products interface and do things properly (by EO-section)
    // ^^ acutally don't bother, this is not production code and there isn't time to perfect it
  filteredProducts: any[] = [];
  categorySelected: string | null = '';
  cart$: Observable<ShoppingCart> = EMPTY;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute,
    private productService: ProductService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll().snapshotChanges().pipe(
      switchMap((products: any) => {
        this.products = products;
        return this.route.queryParamMap;
      })
    ).subscribe(params => {
        this.categorySelected = params.get('category');
        this.applyFilter();
    });
  }

  private applyFilter() { // OOP style of programming: working with the fields of this class, rather passing values around.
    this.filteredProducts = (this.categorySelected) ? 
      this.products.filter(p => p.payload.val().category === this.categorySelected) :
      this.products;
  }

}
