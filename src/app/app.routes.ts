import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layOuts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layOuts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { HomeComponent } from './feature/home/home.component';
import { CartComponent } from './feature/cart/cart.component';
import { ProductsComponent } from './feature/products/products.component';
import { BrandComponent } from './feature/brand/brand.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { DetailsComponent } from './feature/details/details.component';
// import { CheckoutComponent } from './feature/cheakout/cheakout.component';
import { NotfoundComponent } from './feature/notfound/notfound.component';

import { noAuthGuard } from './core/gurades/no-auth-guard';
import { authGuard } from './core/gurades/auth-guard';
import { WishlistComponent } from './feature/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [noAuthGuard],
        title: 'Login Page',
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [noAuthGuard],
        title: 'Register Page',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home page' },
      { path: 'cart', component: CartComponent, title: 'Cart page' },
      { path: 'products', component: ProductsComponent, title: 'Products page' },
      { path: 'details/:slug/:id', component: DetailsComponent, title: 'Details page' },


      { path: 'brands', component: BrandComponent, title: 'Brands page' },
      { path: 'categories', component: CategoriesComponent, title: 'Categories page' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wish List page' },
      // { path: 'details/:id', component: DetailsComponent, title: 'Details page' },









    
    ],
  },

  { path: '**', component: NotfoundComponent, title: 'Not found' },
];

