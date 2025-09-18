import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { dotorOfficeStaffGuard } from './dotor-office-staff-guard';

describe('dotorOfficeStaffGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => dotorOfficeStaffGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
