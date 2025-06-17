import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from "./about/about";
import { Menu } from "./menu/menu";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, About, Menu],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Product-app';
}
