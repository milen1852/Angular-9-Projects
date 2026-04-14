import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../borrow.service';
import { BookService } from 'src/app/book/book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Books } from 'src/app/models/books';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-borrow',
  templateUrl: './add-borrow.component.html',
  styleUrls: ['./add-borrow.component.css']
})
export class AddBorrowComponent implements OnInit {

  constructor(private borrowService: BorrowService, private bookService: BookService, private router: Router,
              private toastr: ToastrService, private location: Location) { }

  books: Books[] = [];

  selectedBook = {
    title: '',
    author: '',
    publisher: '',
  };

  borrow: any = {
    bookId: null
  };

  errorMessages: { [key: string]: string[] } = {};

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.books = data.filter((b: any) => b.availableCopies > 0);
      },

      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  onBookChange(bookId: number) {

    if (!bookId) { return; }

    this.bookService.getBookById(bookId).subscribe({
      next: (res) => {
        this.selectedBook = res;
      }
    });
  }

  onBorrowDateChange() {
    if (!this.borrow.borrowDate) { return; }

    const borrow = new Date(this.borrow.borrowDate);
    const due = new Date(borrow);
    due.setDate(borrow.getDate() + 30);

    this.borrow.dueDate = due.toISOString().split('T')[0];

    this.borrow.status = 'BORROWED';
  }

  addBorrow(form: NgForm) {

    this.borrowService.addBorrow(this.borrow).subscribe({
      next: () => {
        this.toastr.success('Book Borrowed Successfully');
        setTimeout(() => {
          form.resetForm();

          this.selectedBook = {
            author: '',
            title: '',
            publisher: ''
          };

          this.errorMessages = {};
        }, 100);
      },
      error: (err) => {
        if (err.status === 400) {
          this.errorMessages = err.error;
        } else {
          this.toastr.error(err.error.error);
        }
      }
    });
  }

  clearForm(form: NgForm) {
    form.resetForm();
    this.errorMessages = {};
    this.toastr.info('Form Cleared');
  }

  goBack(): void {
    this.location.back();
  }

}
