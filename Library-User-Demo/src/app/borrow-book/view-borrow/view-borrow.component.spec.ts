import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBorrowComponent } from './view-borrow.component';

describe('ViewBorrowComponent', () => {
  let component: ViewBorrowComponent;
  let fixture: ComponentFixture<ViewBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
