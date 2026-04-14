import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  product: any = {};
  prodId!: number;
  productForm: any;

  constructor(private service: ProductService, private toastr: ToastrService) { }

  update() {
  this.service.updateProduct(this.prodId, this.product).subscribe(
    () => {
      this.toastr.info('Product updated successfully', 'Updated');
      this.product = {};
      this.prodId = null!;
    },
    () => {
      alert('❌ Product ID not found');
    }
  );
}

  ngOnInit(): void {
    const state = history.state;
  if (state?.product) {
    this.productForm.patchValue(state.product);
  }
  }

}
