import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/index';
import 'rxjs/add/operator/takeUntil';
import {ShoppingCartService} from '../services/shopping-cart.service';




@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent implements OnInit, OnDestroy {

  products: any;
  filteredproducts: any;
  category: any;
  cart: any;

  private ngUnsubscribe: Subject<any> = new Subject();




  constructor(private service: CategoryService,
              private route: ActivatedRoute, private cartService: ShoppingCartService) {


  }


ngOnInit() {

  this.route.queryParamMap.takeUntil(this.ngUnsubscribe).subscribe(params => {
    this.category = params.get('category');
    const cartId = localStorage.getItem('cartId');
    if (this.category) {
     this.service.allProductNames(this.category).takeUntil(this.ngUnsubscribe).subscribe(data => {
        this.filteredproducts = this.products = data;
      });
    } else {
      if (cartId) {
        this.service.getProducts(cartId).takeUntil(this.ngUnsubscribe).subscribe(data => {
          this.filteredproducts = this.products = data;
        });
      }
    }

  });


}


ngOnDestroy() {
  this.ngUnsubscribe.next();
  this.ngUnsubscribe.complete();
}





}
