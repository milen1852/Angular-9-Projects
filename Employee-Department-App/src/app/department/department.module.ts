import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDepartmentComponent } from './get-department/get-department.component';
import { AddDepartmentComponent } from './add-department/add-department.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { UpdateDepartmentComponent } from './update-department/update-department.component';
import { DeleteDepartmentComponent } from './delete-department/delete-department.component';
import { GetDepartmentIdComponent } from './get-department-id/get-department-id.component';



@NgModule({
  declarations: [
    GetDepartmentComponent, 
    AddDepartmentComponent, 
    UpdateDepartmentComponent, 
    DeleteDepartmentComponent, 
    GetDepartmentIdComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class DepartmentModule { }
