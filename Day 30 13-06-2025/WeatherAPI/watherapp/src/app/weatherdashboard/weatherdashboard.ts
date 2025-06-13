// src/app/weatherdashboard/weatherdashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { WeatherCardComponent } from '../weathercard/weathercard';
import { CitySearchComponent } from '../citysearch/citysearch';
import { Observable, of, switchMap, interval, startWith } from 'rxjs';

@Component({
  selector: 'app-weather-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, CitySearchComponent, WeatherCardComponent],
  templateUrl: './weatherdashboard.html',
  styleUrls: ['./weatherdashboard.css'],
})
export class WeatherDashboardComponent implements OnInit {
  weather$!: Observable<any>;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weather$ = this.weatherService.city$.pipe(
      switchMap((city) =>
        interval(300000).pipe(
          startWith(0),
          switchMap(() => (city ? this.weatherService.getWeather(city) : of(null)))
        )
      )
    );
  }
}
