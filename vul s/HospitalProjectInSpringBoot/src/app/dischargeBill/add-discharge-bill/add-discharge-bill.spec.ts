import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDischargeBill } from './add-discharge-bill';

describe('AddDischargeBill', () => {
  let component: AddDischargeBill;
  let fixture: ComponentFixture<AddDischargeBill>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddDischargeBill]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDischargeBill);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
