import { Component } from '@angular/core';
import { UserLoginModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
user:UserLoginModel = new UserLoginModel();
constructor(private userService:AuthService){

}
handleLogin(){
  this.userService.validateUserLogin(this.user);
}
}
