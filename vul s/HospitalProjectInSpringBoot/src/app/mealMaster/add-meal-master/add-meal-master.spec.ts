import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMealMaster } from './add-meal-master';

describe('AddMealMaster', () => {
  let component: AddMealMaster;
  let fixture: ComponentFixture<AddMealMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMealMaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMealMaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
