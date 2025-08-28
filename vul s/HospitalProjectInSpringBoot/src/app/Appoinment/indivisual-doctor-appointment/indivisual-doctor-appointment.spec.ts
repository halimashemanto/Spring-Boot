import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndivisualDoctorAppointment } from './indivisual-doctor-appointment';

describe('IndivisualDoctorAppointment', () => {
  let component: IndivisualDoctorAppointment;
  let fixture: ComponentFixture<IndivisualDoctorAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndivisualDoctorAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndivisualDoctorAppointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
