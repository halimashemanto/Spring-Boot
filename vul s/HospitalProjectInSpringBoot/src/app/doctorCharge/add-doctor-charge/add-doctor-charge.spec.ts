import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorCharge } from './add-doctor-charge';

describe('AddDoctorCharge', () => {
  let component: AddDoctorCharge;
  let fixture: ComponentFixture<AddDoctorCharge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDoctorCharge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDoctorCharge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
