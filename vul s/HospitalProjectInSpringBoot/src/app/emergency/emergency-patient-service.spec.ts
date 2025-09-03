import { TestBed } from '@angular/core/testing';

import { EmergencyPatientService } from './emergency-patient-service';

describe('EmergencyPatientService', () => {
  let service: EmergencyPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
