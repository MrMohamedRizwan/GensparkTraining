import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Payment } from './payment';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('Payment Component', () => {
  let component: Payment;
  let fixture: ComponentFixture<Payment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Payment, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(Payment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty values', () => {
    const form = component.paymentForm;
    expect(form).toBeDefined();
    expect(form.get('amount')?.value).toBeNull();
    expect(form.get('name')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('contact')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.paymentForm.invalid).toBeTrue();
  });

  it('should show validation error messages', () => {
    const form = component.paymentForm;
    form.get('email')?.markAsTouched();
    fixture.detectChanges();
    expect(component.showError('email')).toBe('Required');

    form.get('email')?.setValue('invalid-email');
    form.get('email')?.markAsTouched();
    expect(component.showError('email')).toBe('Invalid email');

    form.get('contact')?.setValue('123');
    form.get('contact')?.markAsTouched();
    expect(component.showError('contact')).toBe('Must be 10 digits');
  });

  it('should allow valid form submission', () => {
    const mockRazorpayOpen = jasmine.createSpy('open');

    // Mock global Razorpay constructor
    (window as any).Razorpay = function (options: any) {
      return {
        open: mockRazorpayOpen,
      };
    };

    component.paymentForm.setValue({
      amount: 500,
      name: 'Test User',
      email: 'test@example.com',
      contact: '9876543210',
    });

    component.pay();

    expect(component.paymentForm.valid).toBeTrue();
    expect(component.isProcessing).toBeTrue();
    expect(mockRazorpayOpen).toHaveBeenCalled();
  });
});
