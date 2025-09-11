import { TestBed } from '@angular/core/testing';

import { MealMasterService } from './meal-master-service';

describe('MealMasterService', () => {
  let service: MealMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
