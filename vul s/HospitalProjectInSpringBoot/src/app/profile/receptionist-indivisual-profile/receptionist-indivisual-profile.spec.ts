import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistIndivisualProfile } from './receptionist-indivisual-profile';

describe('ReceptionistIndivisualProfile', () => {
  let component: ReceptionistIndivisualProfile;
  let fixture: ComponentFixture<ReceptionistIndivisualProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptionistIndivisualProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistIndivisualProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
