import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestsAdmittedPatient } from './add-tests-admitted-patient';

describe('AddTestsAdmittedPatient', () => {
  let component: AddTestsAdmittedPatient;
  let fixture: ComponentFixture<AddTestsAdmittedPatient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTestsAdmittedPatient]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestsAdmittedPatient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
