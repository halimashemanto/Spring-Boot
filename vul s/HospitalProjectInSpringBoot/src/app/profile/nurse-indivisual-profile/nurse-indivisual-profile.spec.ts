import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseIndivisualProfile } from './nurse-indivisual-profile';

describe('NurseIndivisualProfile', () => {
  let component: NurseIndivisualProfile;
  let fixture: ComponentFixture<NurseIndivisualProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NurseIndivisualProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NurseIndivisualProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
