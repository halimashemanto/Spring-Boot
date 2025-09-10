import { TestBed } from '@angular/core/testing';

import { TestMasterService } from './test-master-service';

describe('TestMasterService', () => {
  let service: TestMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
