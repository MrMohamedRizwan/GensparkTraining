import { Component } from '@angular/core';
import { ProductsComponent } from '../products-component/products-component';

@Component({
  selector: 'app-home-component',
  imports: [ProductsComponent],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {}
