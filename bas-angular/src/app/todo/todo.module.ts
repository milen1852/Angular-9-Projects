import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { ProductViewComponent } from './product-view/product-view.component';



@NgModule({
  declarations: [
    TasksComponent,
    ProductsComponent,
    ProductViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TasksComponent
  ]
})
export class TodoModule { }
