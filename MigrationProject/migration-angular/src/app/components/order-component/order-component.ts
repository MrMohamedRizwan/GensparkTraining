import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OrderService } from '../../Services/order.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-component',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-component.html',
  styleUrl: './order-component.css',
})
export class OrderComponent implements OnInit {
  orders: any[] = [];
  currentPage: any;
  totalPages = 1;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.currentPage = 1;
    this.loadOrders();
  }

  loadOrders(page: number = 1) {
    console.log(page);
    this.orderService.getOrders(page, 10).subscribe((res) => {
      this.orders = res.$values;
      this.currentPage = res.currentPage;
      this.totalPages = res.totalPages;
    });
  }

  viewDetails(id: number) {
    this.router.navigate(['/orders', id]);
  }

  exportOrders() {
    this.orderService.exportOrders().subscribe((res) => {
      const blob = new Blob([res], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
