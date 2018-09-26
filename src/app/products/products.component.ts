import {Component} from '@angular/core';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../models/product';






@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent {

  products: Product[] = [];
  filteredproducts: Product[] = [];
  category: any;




  constructor(private service: CategoryService, private route: ActivatedRoute) {


    route.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      if (this.category) {
        service.allProductNames(this.category).subscribe(data => {
          this.filteredproducts = this.products = data;
        });
      } else {
        service.getProducts().subscribe(data => {
          this.filteredproducts = this.products = data;
        });
      }





    });

  }











}
