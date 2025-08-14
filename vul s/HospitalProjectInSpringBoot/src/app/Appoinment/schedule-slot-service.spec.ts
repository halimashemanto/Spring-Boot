import { TestBed } from '@angular/core/testing';

import { ScheduleSlotService } from './schedule-slot-service';

describe('ScheduleSlotService', () => {
  let service: ScheduleSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
