import { Component } from '@angular/core';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-component',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent {
  products: any[] = [];
  pageNumber = 1;
  totalPages = 0;
  category: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getProducts(this.pageNumber, this.category)
      .subscribe((res) => {
        this.products = res.$values;
        this.pageNumber = res.pageNumber;
        this.totalPages = res.totalPages;
      });
  }

  goToPage(page: number) {
    this.pageNumber = page;
    this.loadProducts();
  }
  addToCart(product: any): void {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const existing = cart.find((p: any) => p.productId === product.productId);
    if (!existing) {
      cart.push({ ...product, quantity: 1 });
    } else {
      existing.quantity += 1;
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  }
}
