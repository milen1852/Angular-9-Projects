import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateUserComponent } from './update-user/update-user.component';
import { GetUsersComponent } from './get-users/get-users.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { NgxDaterangepickerMd } from "ngx-daterangepicker-material";
import { ViewUserComponent } from './view-user/view-user.component';



@NgModule({
  declarations: [
    AddUserComponent,
    UpdateUserComponent, 
    GetUsersComponent, ViewUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgxDaterangepickerMd
]
})
export class UserModule { }
