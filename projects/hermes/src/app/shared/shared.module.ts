import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports: [ // don't have to export all components, only those used outside this module...
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  providers: [
    AuthService,
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService,
    UserService,
    AuthGuard,
  ]
})
export class SharedModule { }
