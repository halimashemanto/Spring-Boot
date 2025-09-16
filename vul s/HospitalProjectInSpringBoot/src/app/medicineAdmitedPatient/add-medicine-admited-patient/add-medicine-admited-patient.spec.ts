import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicineAdmitedPatient } from './add-medicine-admited-patient';

describe('AddMedicineAdmitedPatient', () => {
  let component: AddMedicineAdmitedPatient;
  let fixture: ComponentFixture<AddMedicineAdmitedPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMedicineAdmitedPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMedicineAdmitedPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
