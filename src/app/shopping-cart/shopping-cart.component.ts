import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';
import 'rxjs-compat/add/operator/debounceTime';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

 items: any;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.cartService.items.subscribe(res => {this.items = res; console.log(this.items)});
  }

}
