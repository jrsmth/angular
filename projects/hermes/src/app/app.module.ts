import { ProductService } from './services/product.service';
import { FormsModule } from '@angular/forms';
import { CategoryService } from './services/category.service';
import { AdminProductFormComponent } from './admin/admin-product-form/admin-product-form.component';
import { UserService } from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from '@angular/fire/compat';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    NotFoundComponent,
    AdminProductFormComponent
  ],
  imports: [
    FormsModule,
    CustomFormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
    RouterModule.forRoot([
      // Anonymous
      { path: '', component: HomeComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'login', component: LoginComponent },

      // Users
      { path: 'checkout', component: CheckoutComponent, canActivate: [ AuthGuard ] },
      { path: 'my-orders', component: MyOrdersComponent, canActivate: [ AuthGuard ] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [ AuthGuard ] },

      // Admins
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/products/add', component: AdminProductFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },

      // Not Found
      { path: '**', component: NotFoundComponent }
    ]),
    NgbModule
  ],
  providers: [ 
    AuthService,
    CategoryService,
    ProductService,
    UserService,
    AuthGuard,
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
