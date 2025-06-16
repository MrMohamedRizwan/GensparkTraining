import { Routes } from '@angular/router';
import { About } from './about/about';
import { Products } from './products/products';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path:'home',component:Products},
    {path:'about',component:About}
];
