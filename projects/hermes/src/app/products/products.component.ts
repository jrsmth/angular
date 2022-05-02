import { CategoryService } from './../services/category.service';
import { Observable } from 'rxjs';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products$: Observable<any>;
  categories$: Observable<any>;

  constructor(productService: ProductService, categoryService: CategoryService) { 
    this.products$ = productService.getAll().snapshotChanges();
    this.categories$ = categoryService.getAll().snapshotChanges();
  }

}
