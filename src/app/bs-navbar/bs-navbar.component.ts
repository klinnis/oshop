import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from '../services/token.service';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

public loggedIn: boolean;
public username: string;
public admin: any;

  constructor(private Auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private Token: TokenService,
              private loginservice: LoginService) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
    this.loginservice.navbarUsername1.subscribe(value => this.username = value);
    this.loginservice.admin1.subscribe(value => this.admin = value);
  }

  onLogout() {
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigate(['/'], {relativeTo: this.route});
  }

}
