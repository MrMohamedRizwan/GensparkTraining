import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private apiUrl = 'http://localhost:5022/api/NewsManagement';

  constructor(private http: HttpClient) {}

  getcsv(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/export/csv`);
  }
  getAll(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  create(news: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, news);
  }

  update(id: number, news: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, news);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
