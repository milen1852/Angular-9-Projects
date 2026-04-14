import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetBooksComponent } from './get-books/get-books.component';
import { AddBookComponent } from './add-book/add-book.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GetBooksComponent,
    AddBookComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class BookModule { }
