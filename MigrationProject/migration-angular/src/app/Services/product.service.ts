import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'http://localhost:5022/api/Product';

  constructor(private http: HttpClient) {}

  getProducts(page: number = 1, category: string = '') {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  getProductById(id: any) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  orderNow(id: any) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
}
