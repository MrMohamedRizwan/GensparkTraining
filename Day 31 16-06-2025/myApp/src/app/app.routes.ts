import { Routes } from '@angular/router';
import { Login } from './login/login';
import { First } from './first/first';
import { Product } from './product/product';
import { Products } from './products/products';

export const routes: Routes = [
    {path:'home',component:First},
    {path:'login',component:Login},
    {path:'products',component:Products}
];
