import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss']
})
export class ProductFilterComponent {
  categories$: Observable<any>;
  @Input('categorySelected') categorySelected: String | null = '';

  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getAll().snapshotChanges();
  }

}
