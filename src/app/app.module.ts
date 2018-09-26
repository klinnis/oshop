import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule} from '@angular/router';
import {LoginComponent } from './login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import {BeforeLoginService} from './services/before-login.service';
import {AfterLoginService} from './services/after-login.service';
import { ResetComponent } from './reset/reset.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import {CategoryService} from './category.service';
import {TitleValidators} from './validators/title.validators';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {ShoppingCartService} from './services/shopping-cart.service';












@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ResetComponent,
    LoginComponent,
    SignupComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,




  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', component: ProductsComponent},
      {path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AfterLoginService] },
      {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AfterLoginService] },
      {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AfterLoginService] },
      {path: 'products', component: ProductsComponent, canActivate: [BeforeLoginService]}, // an den ginoun ta 2 apopanw tha paei edw
      {path: 'check-out', component: CheckOutComponent, canActivate: [AfterLoginService]},
      {path: 'order-success', component: OrderSuccessComponent, canActivate: [AfterLoginService]},
      {path: 'my/orders', component: MyOrdersComponent},
      {path: 'login', component: LoginComponent, canActivate: [BeforeLoginService]},
      {path: 'signup', component: SignupComponent, canActivate: [BeforeLoginService]},
      {path: 'admin/products', component: AdminProductsComponent, canActivate: [AfterLoginService]},
      {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AfterLoginService]},
      {path: 'reset', component: ResetComponent}

    ]),
  ],
  providers: [ CategoryService, TitleValidators, ShoppingCartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
