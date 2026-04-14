import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/products';

  constructor(private http: HttpClient) { }

  getProducts(page: number, size: number){
    return this.http.get<any[]>(
      `${this.baseUrl}/view?page=${page}&size=${size}`
    );
  }

  addProduct(product:any){
    return this.http.post<any[]>(`${this.baseUrl}/add`, product)
  }

  updateProduct(prodId: number, product:any){
    return this.http.put(`${this.baseUrl}/update/${prodId}`, product)
  }

  deleteProduct(prodId: number, prodName: string) {
    return this.http.delete(
      `${this.baseUrl}/delete/${prodId}/${prodName}`
    );
  }
}
