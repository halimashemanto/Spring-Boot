import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionistRegistration } from './receptionist-registration';

describe('ReceptionistRegistration', () => {
  let component: ReceptionistRegistration;
  let fixture: ComponentFixture<ReceptionistRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReceptionistRegistration]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionistRegistration);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
