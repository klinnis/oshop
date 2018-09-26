import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private http: HttpClient) { }

  create(date: any) {
    return this.http.put('http://lara.test/api/newcart' , date);
  }

}
