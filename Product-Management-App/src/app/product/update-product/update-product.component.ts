import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Product } from '../models/product';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: Product;

  errorMessages: { [key: string]: string[] } = {};

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.product = this.productService.getSelectedProduct();
    console.log(this.product)

    if (!this.product) {
      this.toastr.warning("Select a Product");
      this.router.navigate(['/get-products'])
      return;
    }
  }

  updateProduct(form: NgForm) {
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        this.toastr.success("Product Updated Successfully")
        this.errorMessages = {};
        form.resetForm({
          prodId: this.product.prodId,
          prodName: this.product.prodName
        })
      },

      error: (err) => {
        if (err.status === 400 && err.error) {
          this.errorMessages = err.error;
          console.log(this.errorMessages);
        }
      }
    })
  }

  clearForm(form: NgForm) {
    form.resetForm({
      prodId: this.product.prodId,
      prodName: this.product.prodName
    })
    this.toastr.info("Form Cleared")
    this.errorMessages = {}
  }

  goBack(){
    this.router.navigate(['/get-products']);
  }

}
