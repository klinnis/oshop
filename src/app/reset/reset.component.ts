import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../services/login.service';
import {SnotifyModule} from 'ng-snotify';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  loginform: FormGroup;

  constructor(private loginservice: LoginService, private notify: SnotifyModule) { }

  ngOnInit() {

    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get email() {
    return this.loginform.get('email');
  }

  onSubmit() {
  this.loginservice.sendPasswordResetLink(this.loginform.value).subscribe(data => this.handleResponse(data),
  error => console.log(error));
  }

  handleResponse(data) {
    this.loginform.value.email = null;
  }

}
