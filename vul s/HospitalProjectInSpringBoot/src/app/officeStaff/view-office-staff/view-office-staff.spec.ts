import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOfficeStaff } from './view-office-staff';

describe('ViewOfficeStaff', () => {
  let component: ViewOfficeStaff;
  let fixture: ComponentFixture<ViewOfficeStaff>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewOfficeStaff]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOfficeStaff);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
