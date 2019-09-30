import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PostedOrder } from '../../models/posted-order';
import { BookedOrder } from '../../models/booked-order';
import { BookingService } from '../services/booking.service';
import { MyToastrService } from '../services/my-toastr.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  bookedOrders: BookedOrder[];
  postedOrders: PostedOrder[];

  constructor(private router: Router,
    private bookingService: BookingService,
    private toastr: MyToastrService) { }

  bookedOrdersPresent: boolean = false;
  postedOrdersPresent: boolean = false;
  firstName: string;
  lastName: string;
  isLoggedIn: boolean = false;



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

    this.bookingService.getAllConsumerOrdersOfAUser().subscribe((response) => {
      if (response.success) {
        if (response.data != undefined) {
          this.bookedOrders = response.data['consumerOrders'];
          console.log("booked orders: ", this.bookedOrders);
          this.bookedOrdersPresent = true;
        } else { 
          console.log("no data key exists for consumer orders.");
        }
      } else {
        console.log("Unable to fetch consumer items.");
      }
    });

    this.bookingService.getAllProducerOrdersOfAUser().subscribe((response) => {
      if (response.success) {
        if (response.data != undefined) {
          this.postedOrders = response.data['producerOrders'];
          console.log("posted orders: ", this.postedOrders);
          this.postedOrdersPresent = true;
        } else { 
          console.log("no data key exists for producer orders.");
        }
      } else {
        console.log("Unable to fetch producer items.");
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
