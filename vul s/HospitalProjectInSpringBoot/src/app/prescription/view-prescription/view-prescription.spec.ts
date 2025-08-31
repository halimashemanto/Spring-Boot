import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPrescription } from './view-prescription';

describe('ViewPrescription', () => {
  let component: ViewPrescription;
  let fixture: ComponentFixture<ViewPrescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewPrescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewPrescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
