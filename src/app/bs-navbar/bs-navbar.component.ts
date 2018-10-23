import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../services/token.service';
import {LoginService} from '../services/login.service';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {Subject} from "rxjs/index";

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})


export class BsNavbarComponent implements OnInit, OnDestroy {

public loggedIn: boolean;
public username: string;
public admin: any;
cnt: any;
cartId: any;
private ngUnsubscribe: Subject<any> = new Subject();
itemsNumber: any;

  constructor(private Auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private Token: TokenService,
              private loginservice: LoginService,
              private cartService: ShoppingCartService) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.loginservice.navbarUsername1.subscribe(value => this.username = value);
    this.loginservice.admin1.subscribe(value => this.admin = value);
    this.cartId = localStorage.getItem('cartId');
    this.cartService.items.subscribe(res => {this.itemsNumber = res; });



  }

  onLogout() {
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigate(['/'], {relativeTo: this.route});
  }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

}
