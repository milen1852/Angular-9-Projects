import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetProductComponent } from './get-product/get-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { UpdateProductComponent } from './update-product/update-product.component';



@NgModule({
  declarations: [
    GetProductComponent, 
    AddProductComponent, 
    UpdateProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
    RouterModule
  ]
})
export class ProductModule { }
