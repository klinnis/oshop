import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenService} from "../services/token.service";

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

public loggedIn: boolean;

  constructor(private Auth: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private Token: TokenService) { }

  ngOnInit() {
    this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  onLogout() {
    this.Auth.changeAuthStatus(false);
    this.Token.remove();
    this.router.navigate(['/login'], {relativeTo: this.route});
  }

}
