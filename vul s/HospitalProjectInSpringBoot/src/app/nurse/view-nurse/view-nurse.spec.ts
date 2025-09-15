import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNurse } from './view-nurse';

describe('ViewNurse', () => {
  let component: ViewNurse;
  let fixture: ComponentFixture<ViewNurse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewNurse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNurse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
