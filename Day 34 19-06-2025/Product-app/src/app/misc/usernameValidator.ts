import { AbstractControl, ValidationErrors } from '@angular/forms';

export function UsernameValidation(control: AbstractControl): ValidationErrors | null {
  const banned = ['admin', 'root'];
  if (control.value && banned.some(word => control.value.toLowerCase().includes(word))) {
    return { bannedUsername: true };
  }
  return null;
}