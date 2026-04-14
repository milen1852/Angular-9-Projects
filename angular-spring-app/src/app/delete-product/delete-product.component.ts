import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

  deleteForm!: FormGroup;
  submitted = false;
  product: any;

  constructor(private fb: FormBuilder, private productService: ProductService) {}

  ngOnInit(): void {
    this.deleteForm = this.fb.group({
      prodId: ['', [Validators.required, Validators.min(100), Validators.max(200)]],
      prodName: ['', [Validators.required, Validators.minLength(3), Validators.pattern('[a-zA-Z]*')]]
    });

    const state = history.state;
  if (state?.product) {
    this.product = state.product;
  }
  }

  get f() {
    return this.deleteForm.controls;
  }

  deleteProduct() {
    this.submitted = true;

    if (this.deleteForm.invalid) {
      return;
    }

    const { prodId, prodName } = this.deleteForm.value;

    if (!confirm(`Are you sure you want to delete ${prodName}?`)) {
      return;
    }

    this.productService.deleteProduct(prodId, prodName).subscribe(
        () => {
        alert('Product deleted successfully');
          this.deleteForm.reset();
          this.submitted = false;
      },
      (error) => {
        alert('Product not found or delete failed');
        console.error(error);
      }
    );
  }
}