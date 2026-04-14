import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetEmployeeComponent } from './get-employee/get-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';
import { FormsModule } from '@angular/forms';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { RouterModule } from '@angular/router';
import { GetEmployeeIdComponent } from './get-employee-id/get-employee-id.component';



@NgModule({
  declarations: [
    GetEmployeeComponent, 
    AddEmployeeComponent, 
    UpdateEmployeeComponent, 
    DeleteEmployeeComponent, 
    GetEmployeeIdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule
  ]
})
export class EmployeeModule { }
