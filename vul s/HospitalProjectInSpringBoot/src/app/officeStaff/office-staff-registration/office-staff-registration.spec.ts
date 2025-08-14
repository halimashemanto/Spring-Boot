import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeStaffRegistration } from './office-staff-registration';

describe('OfficeStaffRegistration', () => {
  let component: OfficeStaffRegistration;
  let fixture: ComponentFixture<OfficeStaffRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeStaffRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeStaffRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
