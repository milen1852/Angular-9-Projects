import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  product: any = {};

  validationError:{[key:string]:string}={};

  constructor(private fb: FormBuilder, private service: ProductService) { }

  ngOnInit(): void {
  }

  add() {
    this.service.addProduct(this.product).subscribe(
      () => {
        alert('✅ Product Added Successfully');
        this.product = {}; // clear form
      },
      (error) => {
        
        alert('❌ Error adding product. Please check all fields.');
        console.error(error);
    }
  );
}

}
