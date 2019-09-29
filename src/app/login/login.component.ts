import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../models/user-login';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MyToastrService } from '../services/my-toastr.service';
import { ToastrService } from 'ngx-toastr';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_+&*-]+(?:\\." + "[a-zA-Z0-9_+&*-]+)*@" + "(?:[a-zA-Z0-9-]+\\.)+[a-z"
      + "A-Z]{2,7}$")]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  userLoginObj = new UserLogin();

  ngOnInit() {
    sessionStorage.clear();
  }

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    this.userLoginObj.setPassword(this.loginForm.get('password').value);
    this.userLoginObj.setUsername(this.loginForm.get('email').value);
    this.userService.login(this.userLoginObj).subscribe((response) => {
      // this.myToastr.showSuccessToast("Logged in successfully.");
      sessionStorage.setItem('token', btoa(this.userLoginObj.username + ':' + this.userLoginObj.password));
      this.router.navigate(['home']);
    });
  }

  redirectToSignup(){
    this.router.navigate(['signup'])
  }

}

