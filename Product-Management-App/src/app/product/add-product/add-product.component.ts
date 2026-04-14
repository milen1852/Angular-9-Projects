import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Partial<Product> = {};

  errorMessages: {[key: string]: string[]} = {};

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  addProduct(form: NgForm){
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        this.toastr.success("Product Added Successfully")
        this.errorMessages = {}
        form.disabled;
      },

      error: (err) => {
        if(err.status === 401) {
          this.errorMessages = err.error;
        }
        else{
          this.errorMessages = err.error;
        }
      }
    })
  }

  clearForm(form: NgForm){
    form.resetForm();
    this.errorMessages = {};
  }

  goBack(): void {
    this.router.navigate(['/get-products'])
  }

}
