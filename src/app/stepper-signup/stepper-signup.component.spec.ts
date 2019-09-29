import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperSignupComponent } from './stepper-signup.component';

describe('StepperSignupComponent', () => {
  let component: StepperSignupComponent;
  let fixture: ComponentFixture<StepperSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
