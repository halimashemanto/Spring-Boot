import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedBooking } from './bed-booking';

describe('BedBooking', () => {
  let component: BedBooking;
  let fixture: ComponentFixture<BedBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedBooking);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
