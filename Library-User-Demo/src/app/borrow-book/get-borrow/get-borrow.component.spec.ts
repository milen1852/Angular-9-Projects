import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetBorrowComponent } from './get-borrow.component';

describe('GetBorrowComponent', () => {
  let component: GetBorrowComponent;
  let fixture: ComponentFixture<GetBorrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetBorrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetBorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
