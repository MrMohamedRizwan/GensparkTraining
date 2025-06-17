import { CanActivateFn } from '@angular/router';

export const authenticaationGuard: CanActivateFn = (route, state) => {
  return true;
};
