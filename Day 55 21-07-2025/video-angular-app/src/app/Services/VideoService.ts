import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private baseUrl = 'http://localhost:5188/api/Videos'; // Update if your port differs

  constructor(private http: HttpClient) {}

  uploadVideo(data: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/upload`, data);
  }
  getById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
