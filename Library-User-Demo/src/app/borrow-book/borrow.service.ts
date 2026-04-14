import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from '../models/pageResponse';
import { BorrowBooks } from '../models/borrowBooks';

@Injectable({
  providedIn: 'root'
})
export class BorrowService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'http://localhost:8083/api';

  private selectedBook: any;

  addBorrow(borrowBook: BorrowBooks) {

    return this.http.post(`${this.baseUrl}/borrow`, borrowBook);
  }

  getBorrowBooks(specRequest): Observable<PageResponse<BorrowBooks>> {

    return this.http.post<PageResponse<BorrowBooks>>(`${this.baseUrl}/borrows`, specRequest);
  }

  getBorrowById(borrowId: string, bookId: number) {
    return this.http.get(`${this.baseUrl}/borrow/${borrowId}/${bookId}`);
  }

  setSelectedEmployee(borrowBook: any) {
    this.selectedBook = borrowBook;
  }

  getSelectedEmployee() {
    return this.selectedBook;
  }

  returnBook(borrowId: string, bookId: number) {
    return this.http.put(`${this.baseUrl}/return/${borrowId}/${bookId}`, {});
  }
}
