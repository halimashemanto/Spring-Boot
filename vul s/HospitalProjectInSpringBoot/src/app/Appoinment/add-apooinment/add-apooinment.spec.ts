import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApooinment } from './add-apooinment';

describe('AddApooinment', () => {
  let component: AddApooinment;
  let fixture: ComponentFixture<AddApooinment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddApooinment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddApooinment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
