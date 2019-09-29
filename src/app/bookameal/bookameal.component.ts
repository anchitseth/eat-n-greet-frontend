import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { disableDebugTools } from '@angular/platform-browser';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { PAGE_DOWN } from '@angular/cdk/keycodes';
import { Postmeal } from '../postmeal';
import { BookingService } from '../services/booking.service';


@Component({
  selector: 'app-bookameal',
  templateUrl: './bookameal.component.html',
  styleUrls: ['./bookameal.component.css']
})
export class BookamealComponent implements OnInit {

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private data: DataService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  orderId: number;
  isLoading: boolean;
  mealDetails: any;

  ngOnInit() {
    this.isLoading = true;
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 3,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '101%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/food2.jpg',
        medium: 'assets/food2.jpg',
        big: 'assets/food2.jpg'
      },
      {
        small: 'assets/thai-food.jpg',
        medium: 'assets/thai-food.jpg',
        big: 'assets/thai-food.jpg'
      }
    ];
    this.activatedRoute.paramMap.subscribe(e => {
      this.orderId = + e.get('orderId');
    });
    this.bookingService.getSingleProducerItem(this.orderId).subscribe((response) => {
      if (response.success) {
        if (response.data['producerOrders'].length > 0) {
          this.mealDetails = response.data['producerOrders'][0];
          let items: any = [];
          items = this.mealDetails.itemList;
          if (items.length > 0) {
            this.galleryImages = [];
            items.forEach(item => {
              let imgObj = {};
              imgObj['small'] = item.imageUrl;
              imgObj['medium'] = item.imageUrl;
              imgObj['large'] = item.imageUrl;
              this.galleryImages.push(imgObj);
            });
          } else {

          }
        } else {
          // show error toast
        }
      }
    });







  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  orders() {
    this.router.navigateByUrl('/myorders');
  }
  postMeal() {
    this.router.navigateByUrl('/postmeal');
  }
  /* wallet()  {
    this.router.navigateByUrl('/wallet');
   }*/
  homeitself() {
    this.router.navigateByUrl('/home');
  }
  onBook() {
    this.toastr.success('successfully booked');
  }
  onBack() {
    this.router.navigateByUrl('/home');
  }

  bookMeal() {
    console.log("book meal number:", this.mealDetails.orderId);
    
  }
}
