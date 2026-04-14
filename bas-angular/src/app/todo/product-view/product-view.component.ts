import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  paramQuery = ''

  constructor(private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.params.subscribe(data =>{
      this.paramQuery = data.id;}
    );
  }

  ngOnInit(): void {
  }

}
