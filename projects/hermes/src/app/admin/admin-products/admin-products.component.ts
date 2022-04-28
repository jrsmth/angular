import { Observable, Subscription } from 'rxjs';
import { ProductService } from './../../services/product.service';
import { Component, OnDestroy } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnDestroy {
  products: any[] = []; // should clean up services and README, to use the products interface and do things properly (by EO-section)
  filteredProducts: any[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges()
      .subscribe(products => this.filteredProducts = this.products = products);
  }
  /* 
    By default, we should unwrap Observables using the async | in the template, so we get auto-unsubscribing
    but in some cases we need to work with the Observable in our component, then we should manually unsubscribe in ngOnDestroy()
  */

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = (query) ? 
      this.products.filter(p => p.payload.val().title.toLowerCase().includes(query.toLowerCase())) // true/false, true => word passes and is used in newly produced array
        : this.products;
  }
}
