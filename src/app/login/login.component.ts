import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {TokenService} from '../services/token.service';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform: FormGroup;




public error = [];

  constructor( private loginservice: LoginService,
               private router: Router,
               private route: ActivatedRoute,
               private Token: TokenService,
               private Auth: AuthService) { }

  ngOnInit() {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

get email() {
    return this.loginform.get('email');
}



  get password() {
    return this.loginform.get('password');
  }



  onSubmit() {
    this.loginservice.signin(this.loginform.value).subscribe(data => {
          this.handleResponse(data);
        },
        error => {
         console.log(error);
        });
  }

  handleResponse(data) {

      console.log(data);
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigate(['/'], {relativeTo: this.route});
  }



  onSignUp() {
    this.router.navigate(['../signup'], {relativeTo: this.route});
  }






}





