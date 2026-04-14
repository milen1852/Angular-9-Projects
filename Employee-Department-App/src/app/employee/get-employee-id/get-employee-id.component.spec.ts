import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmployeeIdComponent } from './get-employee-id.component';

describe('GetEmployeeIdComponent', () => {
  let component: GetEmployeeIdComponent;
  let fixture: ComponentFixture<GetEmployeeIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmployeeIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmployeeIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
