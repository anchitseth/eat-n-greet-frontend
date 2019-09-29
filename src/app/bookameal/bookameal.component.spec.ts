import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookamealComponent } from './bookameal.component';

describe('BookamealComponent', () => {
  let component: BookamealComponent;
  let fixture: ComponentFixture<BookamealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookamealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookamealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
