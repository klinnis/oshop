import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }


  signup(data) {
    return this.http.post('http://lara.test/api/signup', data);
  }

  signin(data) {
    return this.http.post('http://lara.test/api/login', data);
  }

  sendPasswordResetLink(data) {
    return this.http.post('http://lara.test/api/sendPasswordResetLink', data);
  }


}
