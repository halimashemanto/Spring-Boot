import { TestBed } from '@angular/core/testing';

import { MedecineService } from './medecine-service';

describe('MedecineService', () => {
  let service: MedecineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedecineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
