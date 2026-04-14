import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BorrowService } from '../borrow.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';
import 'datatables.net';
import { BorrowBooks } from 'src/app/models/borrowBooks';
import * as moment from 'moment';

@Component({
  selector: 'app-get-borrow',
  templateUrl: './get-borrow.component.html',
  styleUrls: ['./get-borrow.component.css']
})
export class GetBorrowComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private borrowService: BorrowService, private router: Router, private toastr: ToastrService) { }

  table: any;
  page = 0;
  size = 5;
  totalElements = 0;

  borrows: BorrowBooks[] = [];

  selectedBook: any = null;

  bookId: number | null = null;
  borrowedBy: string | null = null;
  status = '';
  borrowedDateRange: any = null;

  maxDate = moment().add(1, 'month');

  ranges = {

    Today: [moment(), moment()],

    YesterDay: [moment().subtract(1, 'day'), moment().subtract(1, 'day')],

    'Last 7 Days': [moment().subtract(7, 'days'), moment().subtract(1, 'day')],

    'Last 2 Months': [moment().subtract(2, 'months').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  };

  ngOnInit(): void {
    this.loadBorrowedBooks();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  loadBorrowedBooks() {

    const specRequest: any = {
      page: this.page,
      size: this.size,
      sortField: 'bookId',
      sortDir: 'asc'
    };

    if (this.bookId != null) { specRequest.bookId = this.bookId; }
    if (this.borrowedBy != null) { specRequest.borrowedBy = this.borrowedBy; }
    if (this.status) { specRequest.status = this.status; }

    if (this.borrowedDateRange?.startDate && this.borrowedDateRange?.endDate) {
      specRequest.fromBorrowedDate = moment(this.borrowedDateRange.startDate).format('YYYY-MM-DD');
      specRequest.toBorrowedDate = moment(this.borrowedDateRange.endDate).format('YYYY-MM-DD');
    }

    this.borrowService.getBorrowBooks(specRequest).subscribe({
      next: (data) => {
        this.borrows = data.content;
        this.totalElements = data.totalElements;
        this.refreshDataTable();
      },

      error: () => {
        this.toastr.error('Failed to Load Borrowed Books');
        this.borrows = [];
        this.refreshDataTable();
      }
    });
  }

  private initDataTable() {

    this.table = $('#borrowTable').DataTable({
      paging: false,
      searching: false,
      ordering: false,
      info: false,
      destroy: true,

      columns: [

        { data: 'borrowId', visible: false },

        { data: 'bookId' },

        { data: 'borrowedBy' },
        {
          data: 'borrowDate',
          render: (d: string) => d ? new Date(d).toLocaleDateString() : '-'
        },

        {
          data: 'dueDate',
          render: (d: string) => d ? new Date(d).toLocaleDateString() : '-'
        },

        {
          data: 'returnDate',
          render: (d: string) => d ? new Date(d).toLocaleDateString() : '-'
        },

        {
          data: 'status',
          render: (d: string) =>
            `<span class="badge ${d === 'BORROWED' ? 'bg-success' : 'bg-warning'}">${d}</span>`
        }
      ]
    });

    $('#borrowTable tbody').on('click', 'tr', (event) => {
      const row = $(event.currentTarget);
      const borrow = this.table.row(row).data();

      if (!borrow) { return; }

      if (row.hasClass('selected-row')) {
        row.removeClass('selected-row');
        this.selectedBook = null;
      } else {
        $('#borrowTable tbody tr').removeClass('selected-row');
        row.addClass('selected-row');
        this.selectedBook = borrow;
      }
    });
  }

  private refreshDataTable(): void {
    if (this.table) {
      this.table.clear();
      this.table.rows.add(this.borrows);
      this.table.draw(false);
    }
  }

  searchBooks(): void {
    this.page = 0;
    this.loadBorrowedBooks();
  }

  resetFilters(): void {
    this.bookId = null;
    this.borrowedBy = null;
    this.status = '';
    this.borrowedDateRange = null;

    this.page = this.page;
    this.loadBorrowedBooks();
  }

  ngOnDestroy(): void {
    if (this.table) {
      this.table.destroy(true);
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadBorrowedBooks();
    }
  }

  nextPage() {
    if ((this.page + 1) * this.size < this.totalElements) {
      this.page++;
      this.loadBorrowedBooks();
    }
  }

  returnSelected() {
    if (!this.selectedBook) { return; }

    this.borrowService.returnBook(this.selectedBook.borrowId, this.selectedBook.bookId).subscribe({
      next: () => {
        this.toastr.warning('Book Returned');
        this.loadBorrowedBooks();
        this.selectedBook = null;
      },
      error: (err) => {
        this.toastr.error(err.error.error);
      }
    });
  }

  viewBorrowBook() {
    if (!this.selectedBook) {
      this.toastr.warning('Select a Book');
      return;
    }

    const borrowId = this.selectedBook.borrowId;
    const bookId = this.selectedBook.bookId;

    this.router.navigate(['/view-borrow', borrowId, bookId]);
  }

  onSizeChange() {
    this.page = 0;
    this.loadBorrowedBooks();
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

}
