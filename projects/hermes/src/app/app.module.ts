import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { provideDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { getDatabase } from 'firebase/database';
import { environment } from 'src/environments/environment';

import { AdminModule } from './admin/admin.module';
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
    BrowserModule,
    SharedModule, // also includes all of the commonly used modules
    RouterModule.forRoot([
      // Anonymous
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },

      // Not Found
      { path: '**', component: NotFoundComponent }
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    provideDatabase(() => getDatabase()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
