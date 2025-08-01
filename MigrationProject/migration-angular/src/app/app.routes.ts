import { Routes } from '@angular/router';
import { Shop } from './components/shop/shop';
import { HomeComponent } from './components/home-component/home-component';
import { ProductsComponent } from './components/products-component/products-component';
import { ContactComponent } from './components/contact-component/contact-component';
import { ColorManagementComponent } from './components/color-management-component/color-management-component';
import { NewsComponent } from './components/news-component/news-component';
import { NewsManagementComponent } from './components/news-management-component/news-management-component';
import { CartComponent } from './components/cart-component/cart-component';
import { OrderComponent } from './components/order-component/order-component';
import { CategoryList } from './components/category-list/category-list';
import { CategoryCreateComponent } from './component/category/category-create-component/category-create-component';
import { CategoryEditComponent } from './component/category/category-edit-component/category-edit-component';
import { CategoryDetailsComponent } from './component/category/category-details-component/category-details-component';
import { NewsViewComponent } from './components/news-view-component/news-view-component';
import { ProductDetail } from './components/product-detail/product-detail';
import { OrderDetail } from './components/order-detail/order-detail';

export const routes: Routes = [
  { path: 'shop', component: Shop },
  { path: '', component: HomeComponent },

  { path: 'products', component: ProductsComponent },
  { path: 'products/details/:id', component: ProductDetail },

  { path: 'contact', component: ContactComponent },
  { path: 'colors', component: ColorManagementComponent },
  { path: 'news', component: NewsComponent },
  { path: 'news-management', component: NewsManagementComponent },
  { path: 'cart', component: CartComponent },

  { path: 'order', component: OrderComponent },
  { path: 'orders/:id', component: OrderDetail },

  { path: 'categories', component: CategoryCreateComponent },
  //   { path: 'categories/create', component: CategoryCreateComponent },
  //   { path: 'categories/edit/:id', component: CategoryEditComponent },
  //   { path: 'categories/details/:id', component: CategoryDetailsComponent },
  //   { path: '', redirectTo: 'categories', pathMatch: 'full' },

  { path: 'news-management/views/:id', component: NewsViewComponent },
];
