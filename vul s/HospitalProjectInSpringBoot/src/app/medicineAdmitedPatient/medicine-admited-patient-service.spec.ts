import { TestBed } from '@angular/core/testing';

import { MedicineAdmitedPatientService } from './medicine-admited-patient-service';

describe('MedicineAdmitedPatientService', () => {
  let service: MedicineAdmitedPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineAdmitedPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
