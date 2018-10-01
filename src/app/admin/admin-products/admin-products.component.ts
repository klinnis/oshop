import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';




@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],

})
export class AdminProductsComponent implements OnInit {

  products: any;
  filteredproducts: any;




  constructor(private categoryservice: CategoryService) {

  }

  ngOnInit() {



    setTimeout(() => {

      this.categoryservice.getProducts(-1).subscribe( data =>
      this.filteredproducts = this.products = data);
    }, 500);
  }

  filter(query: string) {
     this.filteredproducts = (query) ?
         this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }




}
