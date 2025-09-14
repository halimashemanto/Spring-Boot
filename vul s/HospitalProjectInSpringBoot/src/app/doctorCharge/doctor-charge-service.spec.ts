import { TestBed } from '@angular/core/testing';

import { DoctorChargeService } from './doctor-charge-service';

describe('DoctorChargeService', () => {
  let service: DoctorChargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorChargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
