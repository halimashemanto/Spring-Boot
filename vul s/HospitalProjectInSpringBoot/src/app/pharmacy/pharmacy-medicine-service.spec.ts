import { TestBed } from '@angular/core/testing';

import { PharmacyMedicineService } from './pharmacy-medicine-service';

describe('PharmacyMedicineService', () => {
  let service: PharmacyMedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacyMedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
