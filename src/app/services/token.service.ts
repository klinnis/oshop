import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {

    login : 'http://lara.test/api/login',
    signup: 'http://lara.test/api/signup'
  };

  constructor() { }

  handle(token) {
    this.set(token);
  }

  set(token) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    localStorage.removeItem('token');
  }

  isValid() {

    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {

        // const values = Object.keys(this.iss);
    if (this.iss.login === (payload.iss) || (this.iss.signup === (payload.iss)) ) {
           return true;
         } else {
      return false;
    }

      }

    }
    return false;
  }


payload(token) {
  const payload = token.split('.')[1];
  return this.decode(payload);
}

decode(payload) {
  return JSON.parse(atob(payload));
}

loggedIn() {
    return this.isValid();
}

}