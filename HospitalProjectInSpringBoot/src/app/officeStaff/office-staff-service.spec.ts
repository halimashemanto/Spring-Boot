import { TestBed } from '@angular/core/testing';

import { OfficeStaffService } from './office-staff-service';

describe('OfficeStaffService', () => {
  let service: OfficeStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfficeStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
