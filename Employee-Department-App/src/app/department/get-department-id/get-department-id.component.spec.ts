import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetDepartmentIdComponent } from './get-department-id.component';

describe('GetDepartmentIdComponent', () => {
  let component: GetDepartmentIdComponent;
  let fixture: ComponentFixture<GetDepartmentIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetDepartmentIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetDepartmentIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
