import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeStaffIndivisualProfile } from './office-staff-indivisual-profile';

describe('OfficeStaffIndivisualProfile', () => {
  let component: OfficeStaffIndivisualProfile;
  let fixture: ComponentFixture<OfficeStaffIndivisualProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfficeStaffIndivisualProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OfficeStaffIndivisualProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
