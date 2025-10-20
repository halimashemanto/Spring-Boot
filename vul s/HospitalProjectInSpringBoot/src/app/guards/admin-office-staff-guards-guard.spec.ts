import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminOfficeStaffGuardsGuard } from './admin-office-staff-guards-guard';

describe('adminOfficeStaffGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminOfficeStaffGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
