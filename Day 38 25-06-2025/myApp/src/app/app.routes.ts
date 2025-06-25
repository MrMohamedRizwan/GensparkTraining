import { Routes } from '@angular/router';
import { First } from './first/first';
import { Login } from './login/login';
import { Products } from './products/products';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { AuthGuard } from './auth-guard';
import { NotificationComponent } from './notification/notification';
import { FileUploadComponent } from './file-upload-component/file-upload-component';
import { ImageComponent } from './image-component/image-component';
import { Recipes } from './recipes/recipes';

export const routes: Routes = [
  { path: '', component: Recipes },
  { path: 'img', component: ImageComponent },

  { path: 'landing', component: First },
  { path: 'login', component: Login },
  { path: 'products', component: Products },
  {
    path: 'home/:un',
    component: Home,
    children: [
      { path: 'products', component: Products },
      { path: 'first', component: First },
    ],
  },
  { path: 'profile', component: Profile, canActivate: [AuthGuard] },
  { path: 'msg', component: FileUploadComponent },
];
