import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { nurseGuard } from './nurse-guard';

describe('nurseGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => nurseGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
