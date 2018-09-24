import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/index';
import {TokenService} from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean>
      | Promise<boolean>
      | boolean {
        if (this.Token.loggedIn() === false) {
          this.router.navigate(['login'], {queryParams: this.route});
        }
      return this.Token.loggedIn();
  }

  constructor(private Token: TokenService, private router: Router) { }
}
