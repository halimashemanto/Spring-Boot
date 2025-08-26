import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicNav } from './public-nav';

describe('PublicNav', () => {
  let component: PublicNav;
  let fixture: ComponentFixture<PublicNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
