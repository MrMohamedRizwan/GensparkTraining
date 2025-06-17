import { Component } from '@angular/core';
import { UserLoginModel } from '../models/UserLoginModel';
import { UserService } from '../services/UserService';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
user:UserLoginModel = new UserLoginModel();
constructor(private userService:UserService,private route:Router){
}
handleLogin(){
  this.userService.validateUserLogin(this.user);
  this.route.navigateByUrl('/products');

}
}

