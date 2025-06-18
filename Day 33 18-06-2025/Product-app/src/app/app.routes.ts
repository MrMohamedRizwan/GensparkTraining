import { Routes } from '@angular/router';
import { About } from './about/about';
import { Products } from './products/products';
import { Product } from './product/product';
import { Login } from './login/login';
import { AuthGuard } from './auth-guard';
import { Signup } from './signup/signup';
import { DashboardComponent } from './dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'signup', component: Signup },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'about', component: About },
  { path: 'products', component: Products, canActivate: [AuthGuard] },
  { path: 'products/:id', component: Product, canActivate: [AuthGuard] }
];