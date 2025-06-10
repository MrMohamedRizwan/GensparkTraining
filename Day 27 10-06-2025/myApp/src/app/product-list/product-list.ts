import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  standalone:true,
   imports: [CommonModule], 
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList {
  cartCount = 0;

  products = [
    { id: 1, name: 'Laptop', img: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200' },
    { id: 2, name: 'Phone', img: 'https://m.media-amazon.com/images/I/31SrIF+Tt7L._SY300_SX300_.jpg' },
    { id: 3, name: 'Headphones', img: 'https://prohifi.in/cdn/shop/products/B_WPx8007_1800x1800_d03f6071-6a8e-442b-bc93-bd3dc8b1638f_880x880.jpg?v=1679726476' },
  ];

  addToCart() {
    this.cartCount++;
  }
}
