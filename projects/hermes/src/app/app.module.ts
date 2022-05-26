import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

import { environment } from '../environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ProductsComponent } from './shopping/components/products/products.component';

// import { DataTableModule } from 'angular-4-data-table';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AdminModule,
    CoreModule,
    FormsModule,
    // DataTableModule, // giving me issues, decided to remove (npm uninstall angular-4-data-table)
    CustomFormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
    RouterModule.forRoot([
      // Anonymous
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },

      // Not Found
      { path: '**', component: NotFoundComponent }
    ]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
