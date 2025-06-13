// login.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // ✅ spelling: style**Urls**
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private authService: AuthService) {}

  login(): void {
    const user = this.authService.login(this.username, this.password);
    if (user) {
      this.authService.saveToSession(user); // or saveToLocal
      alert('Login successful');
    } else {
      this.error = 'Invalid username or password';
    }
  }
}
