export class WeatherData {
  name: string;
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };

  constructor(data: any) {
    this.name = data.name;
    this.weather = data.weather;
    this.main = data.main;
    this.wind = data.wind;
  }
}