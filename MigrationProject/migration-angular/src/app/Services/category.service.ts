import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = 'http://localhost:5022/api/Category';

  constructor(private http: HttpClient) {}

  getAll(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createCategory(payload: any) {
    return this.http.post<void>(`${this.baseUrl}`, payload);
  }
  updateCategory(id: any, payload: any) {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }
}
