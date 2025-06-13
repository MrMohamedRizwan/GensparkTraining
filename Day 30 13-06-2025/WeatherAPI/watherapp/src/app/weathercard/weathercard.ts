// src/app/weathercard/weathercard.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../models/wather.model';

@Component({
  selector: 'app-weather-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weathercard.html',
  styleUrls: ['./weathercard.css'],
})
export class WeatherCardComponent {
  @Input() weather!: WeatherData;
}
