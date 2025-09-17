import { TestBed } from '@angular/core/testing';

import { DischargeBillService } from './discharge-bill-service';

describe('DischargeBillService', () => {
  let service: DischargeBillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DischargeBillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
