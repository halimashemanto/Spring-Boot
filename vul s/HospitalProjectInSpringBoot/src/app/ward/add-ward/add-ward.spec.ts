import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWard } from './add-ward';

describe('AddWard', () => {
  let component: AddWard;
  let fixture: ComponentFixture<AddWard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddWard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
