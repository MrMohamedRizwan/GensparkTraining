// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { UserLoginModel } from '../models/user.model';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-profile.component',
//   imports: [CommonModule],
//   standalone: true,
//   templateUrl: './profile.component.html',
//   styleUrl: './profile.component.css'

// })
// export class ProfileComponent {
//   user: UserLoginModel | null = null;

//   constructor(private authService: AuthService) {}

//   ngOnInit(): void {
//     // Read from either:
//     // this.user = this.authService.getFromLocal();
//     this.user = this.authService.getFromSession();
//     console.log(this.user,"asda");
//   }
// }


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserLoginModel } from '../models/user.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'] // ✅ corrected key
})
export class ProfileComponent {
  user: UserLoginModel | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Read from session
    this.user = this.authService.getFromSession();
    console.log(this.user, "loaded user");
  }
}

