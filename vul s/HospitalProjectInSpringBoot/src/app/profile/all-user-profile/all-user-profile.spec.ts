import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserProfile } from './all-user-profile';

describe('AllUserProfile', () => {
  let component: AllUserProfile;
  let fixture: ComponentFixture<AllUserProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllUserProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
