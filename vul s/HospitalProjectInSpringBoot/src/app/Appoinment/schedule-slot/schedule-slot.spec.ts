import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSlot } from './schedule-slot';

describe('ScheduleSlot', () => {
  let component: ScheduleSlot;
  let fixture: ComponentFixture<ScheduleSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleSlot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleSlot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
