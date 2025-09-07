import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedBookingModalComponent } from './bed-booking-modal-component';

describe('BedBookingModalComponent', () => {
  let component: BedBookingModalComponent;
  let fixture: ComponentFixture<BedBookingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BedBookingModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedBookingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
