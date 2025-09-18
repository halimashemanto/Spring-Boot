import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAdmittionView } from './all-admittion-view';

describe('AllAdmittionView', () => {
  let component: AllAdmittionView;
  let fixture: ComponentFixture<AllAdmittionView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllAdmittionView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAdmittionView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
