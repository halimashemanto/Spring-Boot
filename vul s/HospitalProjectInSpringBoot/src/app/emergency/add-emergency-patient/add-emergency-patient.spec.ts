import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmergencyPatient } from './add-emergency-patient';

describe('AddEmergencyPatient', () => {
  let component: AddEmergencyPatient;
  let fixture: ComponentFixture<AddEmergencyPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmergencyPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEmergencyPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
