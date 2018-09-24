import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  imagePath = '../assets/';

  private navbarUsername = new BehaviorSubject<string>('');
  navbarUsername1 = this.navbarUsername.asObservable();

  private admin = new BehaviorSubject<any>(0);
  admin1 = this.admin.asObservable();

  changeUsername(value: string) {
    this.navbarUsername.next(value);
  }

  changeAdmin(value: any) {
    this.admin.next(value);
  }


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

  getimagePath() {
    return this.imagePath;
  }


}
