import { TestBed } from '@angular/core/testing';

import { OthersChargeService } from './others-charge-service';

describe('OthersChargeService', () => {
  let service: OthersChargeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OthersChargeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
