import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart: any[] = [];

  getCart(): any[] {
    return this.cart;
  }

  updateCart(updated: any[]): void {
    this.cart = updated;
  }

  deleteItem(productId: number): void {
    this.cart = this.cart.filter(
      (item) => item.product.productId !== productId
    );
  }

  getTotal(): number {
    return this.cart.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  }
}
