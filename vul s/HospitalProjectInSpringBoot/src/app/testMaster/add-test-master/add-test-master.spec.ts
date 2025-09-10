import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestMaster } from './add-test-master';

describe('AddTestMaster', () => {
  let component: AddTestMaster;
  let fixture: ComponentFixture<AddTestMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTestMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
