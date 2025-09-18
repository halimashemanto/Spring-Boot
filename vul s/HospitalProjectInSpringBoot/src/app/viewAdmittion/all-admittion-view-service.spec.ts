import { TestBed } from '@angular/core/testing';

import { AllAdmittionViewService } from './all-admittion-view-service';

describe('AllAdmittionViewService', () => {
  let service: AllAdmittionViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllAdmittionViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
