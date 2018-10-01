import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  constructor(private http: HttpClient) {
  }


  getCategories() {
    return this.http.get('http://lara.test/api/categories');
  }

  getProductNames(name: string) {
    return this.http.get('http://lara.test/api/product-names/' + name);
  }

  allProductNames(name: any) {
    return this.http.get('http://lara.test/api/allproductnames/' + name);
  }

  saveProducts(value: any) {
    return this.http.put('http://lara.test/api/store', value);
  }

  getProducts(cartId: any) {
    return this.http.get('http://lara.test/api/products/' + cartId);
  }

  getOneProduct(index) {
    return this.http.get('http://lara.test/api/oneproduct/' + index);
  }

  updateProduct(index: number, product: any) {
    return this.http.put('http://lara.test/api/updateproduct/' + index, product);
  }

  deleteProduct(index: number) {
    return this.http.delete('http://lara.test/api/deleteproduct/' + index);
  }
}


