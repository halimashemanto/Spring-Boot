import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAppointment } from './view-all-appointment';

describe('ViewAllAppointment', () => {
  let component: ViewAllAppointment;
  let fixture: ComponentFixture<ViewAllAppointment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllAppointment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllAppointment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
