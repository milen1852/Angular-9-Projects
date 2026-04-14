import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse } from './models/pageResponse';
import { Product } from './models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8081/api";

  getProducts(specRequest): Observable<PageResponse<Product>> {

    return this.http.post<PageResponse<Product>>(`${this.baseUrl}/products`, specRequest)
  }

  addProduct(product){

    return this.http.post(`${this.baseUrl}/product`, product)
  }

  updateProduct(product) {
    const prodId = product.prodId
    const prodName = product.prodName

    return this.http.put(`${this.baseUrl}/product/${prodId}/${encodeURIComponent(prodName)}`, product)
  }

  private selectedProduct = null;

  setSelectedProduct(product) {
    this.selectedProduct = product;
  }

  getSelectedProduct() {
    return this.selectedProduct;
  }
}
