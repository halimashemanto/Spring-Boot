import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineStock } from './medicine-stock';

describe('MedicineStock', () => {
  let component: MedicineStock;
  let fixture: ComponentFixture<MedicineStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MedicineStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineStock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
