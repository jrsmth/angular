import { ShoppingModule } from './../shopping/shopping.module';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductFormComponent } from './components/admin-product-form/admin-product-form.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth-guard.service';

@NgModule({
  declarations: [    
    AdminProductsComponent,
    AdminOrdersComponent,
    AdminProductFormComponent
  ],
  imports: [
    SharedModule,
    ShoppingModule,
    RouterModule.forChild([ // forRoot is for App Module only
      { path: 'admin/products/add', component: AdminProductFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/products/:id', component: AdminProductFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
    ])
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
