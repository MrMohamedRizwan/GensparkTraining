import { Component, Input } from '@angular/core';
import { ProductModel } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/products.services';

@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class Product {
  @Input() product: any;
  @Input() searchTerm = '';

  highlight(text: string): string {
    if (!this.searchTerm) return text;
    const regex = new RegExp(`(${this.searchTerm})`, 'gi');
    return text.replace(regex, `<mark>$1</mark>`);
  }

// product!: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe({
      next: (data) => (this.product = data)
    });
  }
}
