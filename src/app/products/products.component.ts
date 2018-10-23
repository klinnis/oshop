import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../category.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/index';
import 'rxjs/add/operator/takeUntil';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {Product} from '../models/product';
import { mergeMap } from 'rxjs/operators';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],

})
export class ProductsComponent implements OnInit, OnDestroy {

    products: any;
    filteredproducts: any;
    category: any;
    res: any;
    cartId: any;
    private ngUnsubscribe: Subject<any> = new Subject();






    constructor(private service: CategoryService,
                private route: ActivatedRoute,
                private cartService: ShoppingCartService) {


    }


    ngOnInit() {

    const final = this.route.queryParamMap.pipe(mergeMap(val => {
            this.category = val.get('category');
            this.cartId = localStorage.getItem('cartId');
        this.cartService.numberOfItems(this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res => {
            this.cartService.updatedItems(res); });
            if (this.category) {
                return this.service.allProductNames(this.category, this.cartId);
            } else {
                if (this.cartId === null) {
                    this.cartId = -1;
                }
            }
            return this.service.getProducts(this.cartId);
        }));




         final.takeUntil(this.ngUnsubscribe).subscribe(val => {
             this.filteredproducts = val;
              });
    }




    addToCart(products: Product) {

        const cartId = this.cartService.getOrCreateCartId();


        if (!cartId) {
        const imero = new Date().getTime();
        const final = this.cartService.create(imero).pipe(mergeMap(res => {
        this.res = res;
        localStorage.setItem('cartId', this.res.id);
          if (this.category) {
        this.cartService.createItem(products.id, this.res.id).takeUntil(this.ngUnsubscribe).subscribe(res1 => {});
              this.cartService.numberOfItems(this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res44 => {
                  this.cartService.updatedItems(res44); });
          return this.service.allProductNames(this.category, this.res.id);
             } else {
             this.cartService.createItem(products.id, this.res.id).takeUntil(this.ngUnsubscribe).subscribe(res2 => {});
              this.cartService.numberOfItems(this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res44 => {
                  this.cartService.updatedItems(res44); });
                  return this.service.getProducts(this.res.id);
                    }
            }));

        final.takeUntil(this.ngUnsubscribe).subscribe(val => {
            this.filteredproducts = val;
            });

        } else {
            this.cartId = localStorage.getItem('cartId');
            const final = this.cartService.createItem(products.id, this.cartId).pipe(mergeMap(res => {
                this.cartService.numberOfItems(this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res45 => {
                    this.cartService.updatedItems(res45); });
                if (this.category) {
                    return this.service.allProductNames(this.category, this.cartId);
                } else {
                    return this.service.getProducts(this.cartId);
                }
            }));
            final.takeUntil(this.ngUnsubscribe).subscribe(val => {
                this.filteredproducts = val;

              });
        }
    }

    removeFromCart(product: Product) {
    const final = this.cartService.removeItem(product.id, this.cartId).pipe(mergeMap(res => {
        if (this.category) {
            this.cartService.numberOfItems(this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res44 => {
                this.cartService.updatedItems(res44); });
            return this.service.allProductNames(this.category, this.cartId);
        } else {
            this.cartService.numberOfItems(this.cartId).takeUntil(this.ngUnsubscribe).subscribe(res44 => {
                this.cartService.updatedItems(res44); });
            return this.service.getProducts(this.cartId);
        }
    }));
    final.takeUntil(this.ngUnsubscribe).subscribe(val => {this.filteredproducts = val;
         });
    }


    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}






