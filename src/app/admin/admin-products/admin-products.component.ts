import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../../category.service';
import {Subscription} from 'rxjs/index';
import {Product} from '../../models/product';



@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],

})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: Product;
  filteredproducts: any;
  subscription: Subscription;




  constructor(private categoryservice: CategoryService) {

  }

  ngOnInit() {



    setTimeout(() => {

     this.subscription = this.categoryservice.getProducts().subscribe( data =>
      this.filteredproducts = this.products = data);
    }, 500);
  }

  filter(query: string) {
     this.filteredproducts = (query) ?
         this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
