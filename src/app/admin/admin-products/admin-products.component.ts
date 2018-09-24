import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';


@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  products: any;

  constructor(private categoryservice: CategoryService) {
  }

  ngOnInit() {

    setTimeout(() => {

      this.categoryservice.getProducts().subscribe( data =>
      this.products = data);
    }, 500);




  }

}
