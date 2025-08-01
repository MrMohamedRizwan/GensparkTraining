import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-contact-component',
  imports: [ReactiveFormsModule, CommonModule, RecaptchaModule],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
})
export class ContactComponent {
  contactForm: FormGroup;
  captchaToken: string | null = null;
  message: string = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      cusName: ['', Validators.required],
      cusPhone: ['', Validators.required],
      cusEmail: ['', [Validators.required, Validators.email]],
      cusContent: ['', Validators.required],
    });
  }

  onCaptchaResolved(token: string | null) {
    this.captchaToken = token;
  }

  onSubmit() {
    if (this.contactForm.valid && this.captchaToken) {
      // Handle form submission here, including sending captchaToken to backend
      console.log('Form submitted:', this.contactForm.value, this.captchaToken);
      this.message = 'Form submitted successfully!';
    } else {
      this.message = 'Please fill the form and complete reCAPTCHA';
    }
  }
}
