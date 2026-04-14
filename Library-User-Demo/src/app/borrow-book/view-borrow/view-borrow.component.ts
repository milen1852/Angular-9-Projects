import { Component, OnInit } from '@angular/core';
import { BorrowService } from '../borrow.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/book/book.service';

@Component({
  selector: 'app-view-borrow',
  templateUrl: './view-borrow.component.html',
  styleUrls: ['./view-borrow.component.css']
})
export class ViewBorrowComponent implements OnInit {

  constructor(private borrowService: BorrowService, private router: Router, private route: ActivatedRoute,
              private toastr: ToastrService, private bookService: BookService) { }

  borrowBook: any;
  bookDetails: any;

  ngOnInit(): void {

    const borrowId = this.route.snapshot.paramMap.get('borrowId');
    const bookId = Number(this.route.snapshot.paramMap.get('bookId'));

    if (!bookId || !borrowId) {
      this.router.navigate(['/get-borrow']);
      return;
    }

    this.borrowService.getBorrowById(borrowId, bookId).subscribe({
      next: (data) => {
        this.borrowBook = data;

        this.bookService.getBookById(bookId).subscribe(
          book => {
            this.bookDetails = book;
          });

      },
      error: () => {
        this.toastr.error('Borrowed Book Not Found');
        this.router.navigate(['/get-borrow']);
      }
    }
    );

  }

  goBack() {
    this.router.navigate(['/get-borrow']);
  }

}
