import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Razorpay global declaration
declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  message = '';
  isProcessing = false;
  paymentForm!: FormGroup;
  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }
  pay() {
    if (this.paymentForm.invalid) {
      this.paymentForm.markAllAsTouched();
      return;
    }
    const form = this.paymentForm.value;
    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: form.amount! * 100,
      currency: 'INR',
      name: 'Demo',
      description: 'TEST',

      modal: {
        ondismiss: () => {
          this.message = '❌ Payment Cancelled';
          this.isProcessing = false;
        },
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.contact,
      },
      notes: {
        note_key: 'Demo',
      },
      theme: {
        color: '#0d4dfd',
      },
    };
    this.isProcessing = true;
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
  showError(controlName: string): string {
    const control = this.paymentForm.get(controlName);
    if (control?.touched && control.invalid) {
      if (control.errors?.['required']) return 'Required';
      if (control.errors?.['email']) return 'Invalid email';
      if (control.errors?.['pattern']) return 'Must be 10 digits';
      if (control.errors?.['min']) return 'Amount must be > 0';
    }
    return '';
  }
}
