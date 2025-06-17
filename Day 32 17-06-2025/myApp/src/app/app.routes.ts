import { Routes } from '@angular/router';
import { Login } from './login/login';
import { First } from './first/first';
import { Product } from './product/product';
import { Products } from './products/products';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { AuthGuard } from './auth-guard';

export const routes: Routes = [
    {path:'home',component:First},
    {path:'login',component:Login},
    {path:'products',component:Products},
    {path:'home/:un',component:Home,children:
        [
            {path:'products',component:Products},
            {path:'first',component:First}
        ]
    },
    {path:'profile',component:Profile,canActivate:[AuthGuard]}
];
