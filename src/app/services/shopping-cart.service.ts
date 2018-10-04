import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/index';



@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  id: any;

    private dataSource = new Subject<any>();
    data1 = this.dataSource.asObservable();




  constructor(private http: HttpClient) { }

   // updatedfiltered(data: any) {
     //   this.dataSource.next(data);
   // }





   create(imero: any) {
    return this.http.put('http://lara.test/api/newcart' , imero);
  }


   getOrCreateCartId() {

    const cartId = localStorage.getItem('cartId');
       if (cartId) { return cartId; }
      }



    createItem(product: any, cart: any) {
       return this.http.put('http://lara.test/api/createItem', {pro: product, car: cart});
}

   removeItem(product: any, cart: any) {
    return this.http.put('http://lara.test/api/deleteItem', {pro: product, car: cart});
}


}



