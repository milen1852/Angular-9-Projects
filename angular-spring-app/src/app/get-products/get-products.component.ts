import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

declare var $: any;

// export interface Product {
//   prodId: number;
//   prodName: string;
//   prodCategory: string;
//   prodPrice: number;
//   prodQuantity: number;
// }

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrls: ['./get-products.component.css']
})
// export class GetProductsComponent implements OnInit {

  // displayedColumns: string[] = [
  //   'prodId',
  //   'prodName',
  //   'prodCategory',
  //   'prodPrice',
  //   'prodQuantity'
  // ];

  // dataSource = new MatTableDataSource<Product>();

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild(MatSort) sort!: MatSort;

  // constructor(private productService: ProductService) {}

  // ngOnInit(): void {
  //   this.getProducts();
  // }

  // getProducts(): void {
  //   this.productService.getProducts().subscribe(
  //     (data) => {
  //       console.log('Products:', data); // 👈 DEBUG LINE
  //       this.dataSource.data = data;
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     (error) => {
  //       alert('Failed to load products');
  //     }
  //   );
  // }
// }


export class GetProductsComponent implements OnInit, OnDestroy {

  selectedProduct: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    const that = this;

    const table = $('#productsTable').DataTable({
      processing: true,
      serverSide: true,
      pageLength: 3,
      lengthMenu: [3, 6, 9],
      destroy: true,

      ajax: (params: any, callback: any) => {
        this.http.get<any>('http://localhost:8081/products/viewByPage', {
          params: {
            draw: params.draw,
            start: params.start,
            length: params.length,
            'search[value]': params.search.value
          }
        }).subscribe(response => {
          callback({
            draw: response.draw,
            recordsTotal: response.recordsTotal,
            recordsFiltered: response.recordsFiltered,
            data: response.data
          });
        });
      },

      columns: [
        { data: 'key.prodId' },
        { data: 'key.prodName' },
        { data: 'prodCategory' },
        { data: 'prodPrice' },
        { data: 'prodQuantity' }
      ]
    });

    $('#productsTable tbody').on('click', 'tr', function () {

      if ($(this).hasClass('selected')) {
        $(this).removeClass('selected');
        that.selectedProduct = null;
      } else {
        table.$('tr.selected').removeClass('selected');
        $(this).addClass('selected');
        that.selectedProduct = table.row(this).data();
      }
    });
  }

  editProduct() {
    this.router.navigate(['/update'], {
      state: { product: this.selectedProduct }
    });
  }

  deleteProduct() {
    this.router.navigate(['/delete'], {
      state: { product: this.selectedProduct }
    });
  }

  ngOnDestroy(): void {
    $('#productsTable').DataTable().destroy();
  }
}

