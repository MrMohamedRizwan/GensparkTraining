// src/app/app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherDashboardComponent } from "./weatherdashboard/weatherdashboard";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WeatherDashboardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected title = 'watherapp';
}
