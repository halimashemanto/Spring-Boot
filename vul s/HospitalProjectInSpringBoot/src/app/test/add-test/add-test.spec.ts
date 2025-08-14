import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTest } from './add-test';

describe('AddTest', () => {
  let component: AddTest;
  let fixture: ComponentFixture<AddTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
