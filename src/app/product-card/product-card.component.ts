import {Component, Input} from '@angular/core';
import {Product} from '../models/product';
import {ShoppingCartService} from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product: Product;


  constructor(private cartService: ShoppingCartService) {
  }

  addToCart(product: Product) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const date_created = new Date().getTime();
       this.cartService.create(date_created).subscribe(
           res => localStorage.setItem('cartId', res.id));
       } else {
        console.log('ok');
       }
    }
  }


