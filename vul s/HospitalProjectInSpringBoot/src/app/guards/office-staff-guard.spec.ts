import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { officeStaffGuard } from './office-staff-guard';

describe('officeStaffGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => officeStaffGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
