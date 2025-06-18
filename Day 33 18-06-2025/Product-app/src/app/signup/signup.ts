import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/UserService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,private route:Router) {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      pasword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      
      age: new FormControl(null, [Validators.required, Validators.min(1)]),
      gender: new FormControl('male'),
      role: new FormControl('user'),
      state: new FormControl('')
    });
  }

  submitForm() {
    // if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.userService.addUser(this.signupForm.value).subscribe();
      this.signupForm.reset();
      this.route.navigateByUrl('/');
    // }
  }
}


