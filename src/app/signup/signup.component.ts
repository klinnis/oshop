import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {TokenService} from '../services/token.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loginform: FormGroup;

  constructor(private loginservice: LoginService,
              private Token: TokenService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password_confirm: new FormControl('', Validators.required)
    });
  }


  get email() {
    return this.loginform.get('email');
  }



  get password() {
    return this.loginform.get('password');
  }

  get name() {
    return this.loginform.get('name');
  }

  get password_ok() {
    return this.loginform.get('password_confirm');
  }

  onSubmit() {
    this.loginservice.signup(this.loginform.value).subscribe(
        data => this.handleResponse(data), error => {console.log(error)}
    );

  }


  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigate(['../shopping-cart'], {relativeTo: this.route});
  }





}
