import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpostmealComponent } from './newpostmeal.component';

describe('NewpostmealComponent', () => {
  let component: NewpostmealComponent;
  let fixture: ComponentFixture<NewpostmealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpostmealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewpostmealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
