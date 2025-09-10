import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyMedicine } from './pharmacy-medicine';

describe('PharmacyMedicine', () => {
  let component: PharmacyMedicine;
  let fixture: ComponentFixture<PharmacyMedicine>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharmacyMedicine]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyMedicine);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
