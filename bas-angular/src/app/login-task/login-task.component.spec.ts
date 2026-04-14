import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTaskComponent } from './login-task.component';

describe('LoginTaskComponent', () => {
  let component: LoginTaskComponent;
  let fixture: ComponentFixture<LoginTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
