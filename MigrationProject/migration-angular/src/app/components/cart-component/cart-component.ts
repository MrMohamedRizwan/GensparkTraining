import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../Services/order.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cart-component.html',
  styleUrls: ['./cart-component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  openOrderValues: any;

  order: any = {
    orderName: 'Test Order',
    orderDate: new Date().toISOString().split('T')[0],
    paymentType: 'Debit',
    status: 'Pending',
    customerName: 'Rizwan',
    customerPhone: '9876543211',
    customerEmail: 'rr@gmail.com',
    customerAddress: 'India',
    orderDetails: [],
  };

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.openOrderValues = false;
    const sessionData = sessionStorage.getItem('cart');
    if (sessionData) {
      this.cartItems = JSON.parse(sessionData);
      this.order.orderDetails = this.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }));
    } else {
      this.cartItems = this.cartService.getCart();
    }
  }

  updateQuantity(index: number, input: HTMLInputElement) {
    const newQuantity = parseInt(input.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      this.cartItems[index].quantity = newQuantity;
      this.saveCart();
    }
  }

  deleteItem(productId: string) {
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );
    this.saveCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  submitOrder() {
    this.order.orderDetails = this.cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    this.orderService.postNewOrder(this.order).subscribe({
      next: () => {
        alert('✅ Order submitted successfully!');
        sessionStorage.removeItem('cart');
        this.cartItems = [];
        this.router.navigate(['/thank-you']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Failed to submit order.');
      },
    });
  }

  razorPay() {
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: this.getTotal() * 100, // amount in paise
      currency: 'USD',
      name: 'Demo Shop',
      description: 'Order Payment',
      prefill: {
        name: this.order.customerName,
        email: this.order.customerEmail,
        contact: this.order.customerPhone,
      },
      notes: {
        address: this.order.customerAddress,
      },
      theme: {
        color: '#0d4dfd',
      },
      handler: () => {
        this.submitOrder(); // Only submit after successful payment
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
}
