import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Books } from 'src/app/models/books';
import * as $ from 'jquery';
import 'datatables.net';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-books',
  templateUrl: './get-books.component.html',
  styleUrls: ['./get-books.component.css']
})
export class GetBooksComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private bookService: BookService, private router: Router, private toastr: ToastrService) { }

  table: any;
  page = 0;
  size = 5;
  totalElements = 0;

  books: Books[] = [];

  selectedBook: any = null;

  title: string | null = null;
  author: string | null = null;
  publisher: string | null = null;

  newTotal: number | null = null;

  ngOnInit(): void {
    this.loadBooks();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  loadBooks() {
    const specRequest: any = {
      page: this.page,
      size: this.size,
      sortField: 'bookId',
      sortDir: 'asc'
    };

    if (this.title != null) { specRequest.title = this.title; }
    if (this.author != null) { specRequest.author = this.author; }
    if (this.publisher != null) { specRequest.publisher = this.publisher; }

    this.bookService.getBooks(specRequest).subscribe({
      next: (data) => {
        this.books = data.content;
        this.totalElements = data.totalElements;
        this.refreshDataTable();
      },

      error: () => {
        this.toastr.error('Failed to Load Books');
        this.books = [];
        this.refreshDataTable();
      }
    });
  }

  private initDataTable() {

    this.table = $('#bookTable').DataTable({
      paging: false,
      searching: false,
      ordering: false,
      info: false,
      destroy: true,

      columns: [
        { data: 'bookId' },

        { data: 'title' },

        { data: 'author' },

        { data: 'publisher' },

        { data: 'totalCopies' },

        { data: 'availableCopies' }
      ]
    });

    $('#bookTable tbody').on('click', 'tr', (event) => {
      const row = $(event.currentTarget);
      const book = this.table.row(row).data();

      if (!book) { return; }

      if (row.hasClass('selected-row')) {
        row.removeClass('selected-row');
        this.selectedBook = null;
      } else {
        $('#bookTable tbody tr').removeClass('selected-row');
        row.addClass('selected-row');
        this.selectedBook = book;
      }
    });
  }

  private refreshDataTable(): void {
    if (this.table) {
      this.table.clear();
      this.table.rows.add(this.books);
      this.table.draw(false);
    }
  }

  searchBooks(): void {
    this.page = 0;
    this.loadBooks();
  }

  resetFilters(): void {
    this.title = null;
    this.author = null;
    this.publisher = null;

    this.page = this.page;
    this.loadBooks();
  }

  onUpdateCopies() {
    if (!this.selectedBook)  return; 

    Swal.fire({
      title: 'Update Total Copies',
      input: 'number',
      inputLabel: 'Enter new total copies',
      inputPlaceholder: 'e.g. 10',
      inputAttributes: {
        min: '0'
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: (value: any) => {
        if (!value || value < 0) {
          Swal.showValidationMessage('Please enter a valid number');
        }
        return value;
      }
    } as any).then((result) => {

      if (result.isConfirmed) {
        const newTotal = Number(result.value);
        this.updateCopiesApi(newTotal);
      }
    });
  }

  updateCopiesApi(newTotal: number) {
    const bookId = this.selectedBook.bookId;

    this.bookService.updateTotalCopies(bookId, newTotal).subscribe({
      next: () => {
        Swal.fire('Success', 'Copies updated successfully', 'success');
        this.loadBooks();
        this.selectedBook = null;
      },
      error: err => {
        Swal.fire('Error', err.error?.message || 'Update failed', 'error');
      }
    });
  }



  ngOnDestroy(): void {
    if (this.table) {
      this.table.destroy(true);
    }
  }

  prevPage() {
    if (this.page > 0) {
      this.page--;
      this.loadBooks();
    }
  }

  nextPage() {
    if ((this.page + 1) * this.size < this.totalElements) {
      this.page++;
      this.loadBooks();
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
