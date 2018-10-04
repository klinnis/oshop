import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Product} from '../models/product';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/index';
import {CategoryService} from '../category.service';
import 'rxjs/add/operator/takeUntil';




@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit, OnDestroy {

  @Input() product: any;
  products: any;


  private ngUnsubscribe: Subject<any> = new Subject();
  res: any;
  categoryid: any;
  cartId: any;


  constructor(private cartService: ShoppingCartService,
  private route: ActivatedRoute,
  private service: CategoryService) {

  }

  ngOnInit() {
      this.products = this.product;
  }



  addToCart(products: Product) {



    const cartId = this.cartService.getOrCreateCartId();

    if (!cartId) {
      const imero = new Date().getTime();
      this.cartService.create(imero).takeUntil(this.ngUnsubscribe).subscribe(res => {
        this.res = res;
        localStorage.setItem('cartId', this.res.id);
        this.route.queryParamMap.takeUntil(this.ngUnsubscribe).subscribe(params => {
          this.categoryid = params.get('category');
          if (this.categoryid) { this.cartService.createItem(products.id, this.res.id).takeUntil(this.ngUnsubscribe).subscribe(res1 => console.log(res1)); } else {
            this.cartService.createItem(products.id, this.res.id).takeUntil(this.ngUnsubscribe).subscribe(res1 => console.log(res1));
          }

        });
      });
    } else {
      this.route.queryParamMap.takeUntil(this.ngUnsubscribe).subscribe(params => {
        this.categoryid = params.get('category');
        this.cartId = localStorage.getItem('cartId');
        if (this.categoryid) { this.cartService.createItem(products.id, this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res1 => console.log(res1)); } else {
          this.cartService.createItem(products.id, this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res1 => {});
          setTimeout(() => {
              this.service.getProducts(this.cartId).subscribe(data => {
                  this.products = data;
                  console.log(this.products);});

          }, 500);


        }

      });

    }
  }




  ngOnDestroy(): any {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


}


