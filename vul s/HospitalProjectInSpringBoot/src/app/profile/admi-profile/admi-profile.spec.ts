import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiProfile } from './admi-profile';

describe('AdmiProfile', () => {
  let component: AdmiProfile;
  let fixture: ComponentFixture<AdmiProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmiProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmiProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
