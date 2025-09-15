import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceptionists } from './view-receptionists';

describe('ViewReceptionists', () => {
  let component: ViewReceptionists;
  let fixture: ComponentFixture<ViewReceptionists>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewReceptionists]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewReceptionists);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
