import { TestBed } from '@angular/core/testing';

import { BedBookingService } from './bed-booking-service';

describe('BedBookingService', () => {
  let service: BedBookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BedBookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
