import { Routes } from '@angular/router';
import { About } from './about/about';
import { Products } from './products/products';
import { Product } from './product/product';
import { Login } from './login/login';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'about', component: About },
  { path: 'products', component: Products, canActivate: [AuthGuard] },
  { path: 'products/:id', component: Product, canActivate: [AuthGuard] }
];