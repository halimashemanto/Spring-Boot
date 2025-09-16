import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOthersCharge } from './add-others-charge';

describe('AddOthersCharge', () => {
  let component: AddOthersCharge;
  let fixture: ComponentFixture<AddOthersCharge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOthersCharge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOthersCharge);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
