import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorIndivisualProfile } from './doctor-indivisual-profile';

describe('DoctorIndivisualProfile', () => {
  let component: DoctorIndivisualProfile;
  let fixture: ComponentFixture<DoctorIndivisualProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorIndivisualProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorIndivisualProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
