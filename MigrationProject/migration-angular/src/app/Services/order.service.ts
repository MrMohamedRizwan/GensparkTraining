import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = 'http://localhost:5022/api/Order/orders';

  constructor(private http: HttpClient) {}

  getOrders(page: number, pageSize: number) {
    return this.http.get<any>(
      `${this.apiUrl}?pageNumber=${page}&pageSize=${pageSize}`
    );
  }

  getOrderDetails(id: any) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  exportOrders() {
    return this.http.get(`${this.apiUrl}/export`, { responseType: 'blob' });
  }
  postNewOrder(payload: any) {
    return this.http.post<any>(`${this.apiUrl}`, payload);
  }
}
