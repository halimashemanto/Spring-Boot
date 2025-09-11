import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMeal } from './add-meal';

describe('AddMeal', () => {
  let component: AddMeal;
  let fixture: ComponentFixture<AddMeal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMeal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMeal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
