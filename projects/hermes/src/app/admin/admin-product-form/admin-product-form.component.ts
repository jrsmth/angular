import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent {
  categories$: Observable<any>;
  product: Product = {title: '', price: 0, category: '', imageUrl: ''};
  private id: string | null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 
    this.categories$ = categoryService.getAll().snapshotChanges();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).valueChanges().
        pipe(take(1)).subscribe(
          (p: any) => this.product = p
        );
    }
  }
  // the rxjs take(x) operator takes 'x' values from an Observable and then automatically completes and unsubscribes
  // https://www.learnrxjs.io/learn-rxjs/operators/filtering/take

  save(product: any) {
    if (this.id) // in JS, null evaluates to false
      this.productService.update(this.id, product);
    else
      this.productService.create(product);

    console.log(product);
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!this.id || !confirm('Are you sure you want to delete this product?')) return; 
    // if (this id doens't exist) or (the user changes their mind), cancel the deletion

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }

}
