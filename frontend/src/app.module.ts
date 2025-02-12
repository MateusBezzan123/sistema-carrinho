import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../src/app/app.component';
import { AppRoutingModule } from '../src/app/app-routing.module';
import { ProductListComponent } from '../src/app/product-list/product-list.component';
import { ProductDetailComponent } from '../src/app/product-detail/product-detail.component';
import { CartComponent } from '../src/app/cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
