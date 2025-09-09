import { TestBed } from '@angular/core/testing';

import { TestsAdmittedPatientService } from './tests-admitted-patient-service';

describe('TestsAdmittedPatientService', () => {
  let service: TestsAdmittedPatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestsAdmittedPatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
