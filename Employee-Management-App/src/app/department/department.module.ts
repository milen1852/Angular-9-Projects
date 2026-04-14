import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetDepartmentComponent } from './get-department/get-department.component';
import { GetDepartmentIdComponent } from './get-department-id/get-department-id.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GetDepartmentComponent,
    GetDepartmentIdComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DepartmentModule { }
