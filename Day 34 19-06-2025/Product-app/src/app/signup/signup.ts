import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/UserService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsernameValidation } from '../misc/usernameValidator';
import { PasswordStrengthValidator } from '../misc/PasswordValidator';
import { User } from '../models/signupmodel';
import { passwordsMatchValidator } from '../misc/passwordMatchValidation';
import { UserList } from "../user-list/user-list";

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, ReactiveFormsModule, UserList],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup implements OnInit {
signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,private router:Router) {
    this.signupForm = new FormGroup({
      username: new FormControl('',[Validators.required,UsernameValidation]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('user', [Validators.required])
    }, { validators: passwordsMatchValidator }
  );
  }
  ngOnInit(): void {
    this.signupForm.get('password')?.valueChanges.subscribe(value => {
      console.log('passwod changed:', value, 'Errors:', this.signupForm.get('password')?.errors);
    });
  }

   submitForm() {
    
    // if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      console.log('User submitted:', user);
      this.userService.addUser(user);
    // }
  }

  passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

}

