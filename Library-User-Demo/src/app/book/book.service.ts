import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Books } from '../models/books';
import { PageResponse } from '../models/pageResponse';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:8084/api';

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<Books[]> {

    return this.http.get<Books[]>(`${this.baseUrl}/books`);
  }

  getBooks(specRequest): Observable<PageResponse<Books>> {

    return this.http.post<PageResponse<Books>>(`${this.baseUrl}/books`, specRequest);
  }

  getBookById(bookId: number): Observable<Books> {

    return this.http.get<Books>(`${this.baseUrl}/book/${bookId}`);
  }

  updateTotalCopies(bookId: number, newTotal: number) {

    return this.http.put(`${this.baseUrl}/books/${bookId}/${newTotal}`, {});
  }


}
