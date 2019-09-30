import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MyToastrService } from '../services/my-toastr.service';
import { UserService } from '../services/user.service';
import { PaymentService } from '../services/payment.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  isLoggedIn: boolean = false;
  firstName: string;
  lastName: string;
  constructor(private fb: FormBuilder, private router: Router, private toastr: MyToastrService,
    private userService: UserService,
    private paymentService: PaymentService) { }
  // registrationform = this.fb.group({
  //   fname: ['', []],
  //   lname: ['', []],
  //   email: ['', [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
  //   mobileno: ['', [Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
  //   gender: ['', []],
  //   dob: ['', []],
  //   password: ['', [Validators.minLength(8)]],
  //   changepassword: ['', []],
  //   address: this.fb.group({
  //     block: ['', []],
  //     floor: ['', []],
  //     unit: ['', []],
  //     building: ['', []],
  //     streetname: ['', []],
  //     postcode: ['', []],
  //   })
  // });

  userInfo: any;
  balance: number;

  ngOnInit() {
    let loggedInStatus = sessionStorage.getItem("isLoggedIn");
    if (loggedInStatus == "true") {
      this.isLoggedIn = true;
    } else {
      this.toastr.showErrorToast("No logged in user exists. Please login to continue.");
      this.router.navigate(['login']);
    }
    this.firstName = sessionStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName");
    this.userService.getLoggedInUsersCompleteInfo().subscribe((response) => {
      if (response.success) {
        console.log(response.data);
        
        this.userInfo = response.data['info'];
      }

    });
    this.paymentService.getUserBalance().subscribe((response) => {
      if (response.success) {
        this.balance = response.data['balance'];
      }
    });
  }



  goToMyOrders() {
    if (this.isLoggedIn == true) {
      this.router.navigateByUrl('/orders');
    } else {
      this.toastr.showErrorToast("Please login to continue.");
    }
  }

  goToPostAMeal() {
    if (this.isLoggedIn == true) {
      this.router.navigateByUrl('/post-meal');
    } else {
      this.toastr.showErrorToast("Please login to continue.");
    }
  }

  goToProfile() {
    if (this.isLoggedIn == true) {
      this.router.navigateByUrl('/profile');
    } else {
      this.toastr.showErrorToast("Please login to continue.");
    }
  }

  logout() {
    sessionStorage.clear();
    this.toastr.showSuccessToast("Successfully logged out.");
    this.router.navigate(['login']);
  }

  login() {
    this.router.navigate(['login']);
  }
}
