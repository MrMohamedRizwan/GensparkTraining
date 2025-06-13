// src/app/services/weather.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../models/wather.model';
@Injectable({ providedIn: 'root' })
export class WeatherService {
  private apiKey = '';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

  private citySubject = new BehaviorSubject<string>('Delhi');
  city$ = this.citySubject.asObservable();

  constructor(private http: HttpClient) {}

  setCity(city: string) {
    this.citySubject.next(city);
  }

  getWeather(city: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(
      `${this.apiUrl}${city}&units=metric&appid=${this.apiKey}`
    );
  }
}
