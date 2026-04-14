import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEmployeeComponent } from './get-employee.component';

describe('GetEmployeeComponent', () => {
  let component: GetEmployeeComponent;
  let fixture: ComponentFixture<GetEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
