import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authenticaationGuard } from './authenticaation-guard';

describe('authenticaationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authenticaationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
