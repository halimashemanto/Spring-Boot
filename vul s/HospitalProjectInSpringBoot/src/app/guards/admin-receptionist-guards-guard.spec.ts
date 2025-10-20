import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminReceptionistGuardsGuard } from './admin-receptionist-guards-guard';

describe('adminReceptionistGuardsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminReceptionistGuardsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
