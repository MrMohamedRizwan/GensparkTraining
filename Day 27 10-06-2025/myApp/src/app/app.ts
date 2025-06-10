import { Component } from '@angular/core';
import { First } from "./first/first";
// import { DisplayProducts } from './display-products/display-products';
import { ProductList } from './product-list/product-list';
import { CustomerDetails } from './customer-details/customer-details';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [ProductList,CustomerDetails]
})
export class App {
  protected title = 'myApp';
}