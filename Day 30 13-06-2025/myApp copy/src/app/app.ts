import { Component } from '@angular/core';
import { Products } from './products/products';
import { LoginComponent } from './login.component/login.component';
import { ProfileComponent } from './profile.component/profile.component';
import { Menu } from "./menu/menu";
import { Login } from './login/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.css'], // ✅ Fix here
  standalone: true,
  imports: [Products, Login, ProfileComponent, Menu]
})
export class App {
  protected title = 'myApp';
}
