import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail implements OnInit {
  product!: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    // console.log('vanebdn');
    console.log(id);
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
    });
  }

  addToCart(productId: number): void {
    alert('Product added to cart!');
    this.productService.orderNow(productId).subscribe(() => {});
  }
}
