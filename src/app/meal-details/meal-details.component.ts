import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { disableDebugTools } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { PAGE_DOWN } from '@angular/cdk/keycodes';
import { BookingService } from '../services/booking.service';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { MyToastrService } from '../services/my-toastr.service';


@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css']
})
export class MealDetailsComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  isLoggedIn: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    // private data: DataService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: MyToastrService) { }

  orderId: number;
  isLoading: boolean;
  mealDetails: any;
  preferenceType: string;
  disableBookOrderButton: boolean = false;
  firstName: string;
  lastName: string;

  ngOnInit() {
    let loggedInStatus = sessionStorage.getItem("isLoggedIn");
    if (loggedInStatus == "true") {
      this.isLoggedIn = true;
    }
    this.firstName = sessionStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName");
    this.isLoading = true;
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20,
        preview: false

      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    this.activatedRoute.paramMap.subscribe(e => {
      this.orderId = + e.get('orderId');
    });
    this.bookingService.getSingleProducerItem(this.orderId).subscribe((response) => {
      if (response.success) {
        if (response.data['producerOrders'].length > 0) {
          this.mealDetails = response.data['producerOrders'][0];
          if (this.mealDetails.preferencyType == 1) {
            this.preferenceType = "DINE IN";
          } else {
            this.preferenceType = "TAKE AWAY";
          }
          // console.log("meal details", this.mealDetails);

          let items: any = [];
          items = this.mealDetails.itemList;
          this.galleryImages = [];
          if (items.length > 0) {
            items.forEach(item => {
              let imgObj = {};
              imgObj['small'] = item.imageUrl;
              imgObj['medium'] = item.imageUrl;
              imgObj['large'] = item.imageUrl;
              this.galleryImages.push(imgObj);
            });
          } else {
            let imgObj = {};
            imgObj['small'] = "../../assets/default_food.jpg";
            imgObj['medium'] = "../../assets/default_food.jpg";
            imgObj['large'] = "../../assets/default_food.jpg";
            this.galleryImages.push(imgObj);
          }
        } else {
          this.toastr.showErrorToast("Can't find the meal you are looking for.")
          this.router.navigate(['home']);
        }
      } else {
        this.toastr.showErrorToast("Can't find the meal you are looking for.")
        this.router.navigate(['home']);
      }
    });
  }

  bookMeal() {
    if (sessionStorage.getItem("isLoggedIn") == "false" || sessionStorage.getItem("isLoggedIn") === undefined || sessionStorage.getItem("isLoggedIn") == null) {
      this.toastr.showErrorToast("Please login to continue with the reservation.");
    } else {
      this.bookingService.bookMeal(this.orderId).subscribe((response) => {
        this.isLoading = true;
        this.disableBookOrderButton = true;
        if (response.success) {
          this.toastr.showSuccessToast("You've successfully joined the meal.");
        } else {
          this.disableBookOrderButton = false;
          this.toastr.showErrorToast(response.message);
        }
      });
    }
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
