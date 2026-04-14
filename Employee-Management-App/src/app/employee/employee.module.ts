import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEmployeeComponent } from './get-employee/get-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DepartmentModule } from '../department/department.module';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';



@NgModule({
  declarations: [ 
    GetEmployeeComponent, 
    AddEmployeeComponent, 
    DeleteEmployeeComponent, 
    UpdateEmployeeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule
  ],
  exports: [
    DepartmentModule
  ]
})
export class EmployeeModule { }
