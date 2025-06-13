import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, interval, of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

  private citySubject = new BehaviorSubject<string>('');
  city$ = this.citySubject.asObservable();

  constructor(private http: HttpClient) {}

  setCity(city: string) {
    this.citySubject.next(city);
  }

  getWeather(city: string) {
    const url = `${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url).pipe(
      catchError((err) => {
        return of({ error: true, message: err.error.message || 'API Error' });
      })
    );
  }
}