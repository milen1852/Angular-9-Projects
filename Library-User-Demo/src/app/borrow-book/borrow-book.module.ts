import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetBorrowComponent } from './get-borrow/get-borrow.component';
import { AddBorrowComponent } from './add-borrow/add-borrow.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ViewBorrowComponent } from './view-borrow/view-borrow.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';



@NgModule({
  declarations: [
    GetBorrowComponent,
    AddBorrowComponent, ViewBorrowComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxDaterangepickerMd.forRoot()
  ]
})
export class BorrowBookModule { }
