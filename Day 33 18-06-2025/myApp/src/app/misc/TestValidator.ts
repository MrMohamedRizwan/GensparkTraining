import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function TestValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && value.length < 6) {
      return { lenError: "Password must be at least 6 characters long." };
    }
    return null;
  };
}
