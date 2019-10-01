import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { BookingService } from '../services/booking.service';
import { MyToastrService } from '../services/my-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message: string;
  obj: any;
  isLoading: boolean = false;
  firstName: string;
  lastName: string;
  orderList: any[];
  isLoggedIn: boolean = false;

  constructor(private router: Router,
    private userService: UserService,
    private bookingService: BookingService,
    private toastr: MyToastrService

  ) { }

  ngOnInit() {
    this.isLoading = true;
    let loggedInStatus = sessionStorage.getItem("isLoggedIn");
    if (loggedInStatus == "true") {
      this.isLoggedIn = true;
    }
    this.userService.getLoggedInUserInfo().subscribe((response) => {
      this.firstName = response['data']['firstName'];
      this.lastName = response['data']['lastName'];
      sessionStorage.setItem("firstName", this.firstName);
      sessionStorage.setItem("lastName", this.lastName);
    });

    this.bookingService.getAllOrdersForListing().subscribe((response) => {
      if (response.success) {
        this.orderList = response.data['producerOrders'];
      }

      this.isLoading = false;
    });

  }

  viewOrderDetails(orderId) {
    this.router.navigate(['meal-details/' + orderId]);
  }

  goToHome() {
      this.router.navigateByUrl('/home');
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
