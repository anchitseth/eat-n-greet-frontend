import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAMealComponent } from './post-a-meal.component';

describe('PostAMealComponent', () => {
  let component: PostAMealComponent;
  let fixture: ComponentFixture<PostAMealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostAMealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostAMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
