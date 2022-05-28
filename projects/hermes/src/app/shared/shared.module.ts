import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { AppRoutingModule } from '../app-routing.module';
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
    CommonModule,
    FormsModule,
    // DataTableModule, // giving me issues, decided to remove (npm uninstall angular-4-data-table)
    AppRoutingModule,
    CustomFormsModule,
    NgbModule
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
  ],
  exports: [ // don't have to export all components, only those used outside this module...
    ProductCardComponent,
    ProductQuantityComponent,

    // the modules below were imported and exported again so they could be reused by multiple modules
      // this way, we don't need to explicitly ask for these commonly used modules in every single module they're required in
    CommonModule,
    FormsModule,
    AppRoutingModule,
    CustomFormsModule,
    NgbModule
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
