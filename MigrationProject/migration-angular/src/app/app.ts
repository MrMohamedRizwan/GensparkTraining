import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shop } from './components/shop/shop';
import { Header } from './components/header/header';
import { Topmenu } from './components/topmenu/topmenu';
import { Sidebar } from './components/sidebar/sidebar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Shop, Header, Topmenu, Sidebar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'migration-angular';
}
