import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../models/product';
import * as $ from 'jquery';
import 'datatables.net'
import * as moment from 'moment';

@Component({
  selector: 'app-get-product',
  templateUrl: './get-product.component.html',
  styleUrls: ['./get-product.component.css']
})
export class GetProductComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(private productService: ProductService, private router: Router, private toastr: ToastrService) { }

  table: any;
  page = 0;
  size = 5;
  totalElements = 0;

  products: Product[] = [];
  selectedProduct: null;

  prodId: number | null = null;
  prodName: string | null = null;
  prodCategory: string | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  orderDateRange: any = null;

  maxDate = moment();

  ranges: any = {
    Today: [moment(), moment()]
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngAfterViewInit(): void {
    this.initDataTable();
  }

  loadProducts(): void {

    const specRequest: any = {
      page: this.page,
      size: this.size,
      sortField: 'key.prodId',
      sortDir: 'asc'
    }

    if(this.prodId != null) specRequest.prodId = this.prodId
    if(this.prodName != null) specRequest.prodName = this.prodName
    if(this.prodCategory != null) specRequest.prodCategory = this.prodCategory
    if(this.minPrice != null) specRequest.minPrice = this.minPrice;
    if(this.maxPrice != null) specRequest.maxPrice = this.maxPrice;

    if(this.orderDateRange != null && this.orderDateRange.startDate && this.orderDateRange.endDate){
      specRequest.orderDateFrom = moment(this.orderDateRange.startDate).format("YYYY-MM-DD");

      specRequest.orderDateTo = moment(this.orderDateRange.endDate).format("YYYY-MM-DD");
    }

    this.productService.getProducts(specRequest).subscribe({
      next: (res) => {
        this.products = res.content;
        this.totalElements = res.totalElements;

        this.refreshDataTable();
      },
      error: () => {
        this.toastr.error("Failed to load Products")
        this.products = [];
        this.refreshDataTable();
      }
    })
  }

  private initDataTable(): void {
    this.table = $('#productTable').DataTable({
      paging: false,
      searching: false,
      ordering: false,
      info: false,
      destroy: true,

      columns: [
        {data: 'prodId'},
        {data: 'prodName'},
        {data: 'prodCategory'},
        {data: 'prodPrice',
          render: (d: number) => d ? d.toLocaleString() : '-'
        },
        {data: 'prodQuantity'},
        {data: 'orderDate'
        }
      ]
    })

    $('#productTable tbody').on('click', 'tr', (event) =>{

      const row = $(event.currentTarget);
      const product = this.table.row(row).data();

      if(!product) return;

      if(row.hasClass('selected-row')){
        row.removeClass('selected-row')
        this.selectedProduct = null;
      }

      else{
        $('#productTable tbody tr').removeClass('selected-row');
        row.addClass('selected-row')
        this.selectedProduct = product;
      }
    });

  }

  private refreshDataTable(): void {
    if(this.table){
      this.table.clear();
      this.table.rows.add(this.products);
      this.table.draw(false);
    }
  }

  searchProducts(): void {
    this.page = 0;
    this.loadProducts();
  }

  resetFilters(): void {
    this.prodId = null;
    this.prodName = null;
    this.prodCategory = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.orderDateRange = null;

    this.page = 0;
    this.loadProducts();
  }

  nextPage(): void {
    if( (this.page + 1) * this.size < this.totalElements ){
      this.page++;
      this.loadProducts();
    }
  }


  prevPage(): void {
    if(this.page > 0){
      this.page--;
      this.loadProducts()
    }
  }

  ngOnDestroy(): void {
    if(this.table){
      this.table.destroy(true)
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard'])
  }

  updateProduct(): void {
    if(!this.selectedProduct){
      this.toastr.warning("Select a Product");
      return;
    }

    this.productService.setSelectedProduct(this.selectedProduct);
    this.router.navigate(['/update-product']);
  }

}
