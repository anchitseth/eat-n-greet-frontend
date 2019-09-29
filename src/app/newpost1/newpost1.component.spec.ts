import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Newpost1Component } from './newpost1.component';

describe('Newpost1Component', () => {
  let component: Newpost1Component;
  let fixture: ComponentFixture<Newpost1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Newpost1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Newpost1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
