// src/app/citysearch/citysearch.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-city-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './citysearch.html',
  styleUrls: ['./citysearch.css'],
})
export class CitySearchComponent {
  city = '';

  constructor(private weatherService: WeatherService) {}

  search() {
    if (this.city.trim()) {
      this.weatherService.setCity(this.city.trim());
    }
  }
}
