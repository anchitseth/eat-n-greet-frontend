import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith, timeInterval } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToastrService, Toast } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import * as moment from 'moment'
import { MyToastrService } from '../services/my-toastr.service';


@Component({
  selector: 'app-post-a-meal',
  templateUrl: './post-a-meal.component.html',
  styleUrls: ['./post-a-meal.component.css']
})
export class PostAMealComponent implements OnInit {

  // visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  itemCtrl = new FormControl();
  filteredItems: Observable<string[]>;
  selectedItems: string[] = [];
  allItems: string[] = [];
  isLoading: boolean;
  today: Date = new Date();
  firstName: string;
  lastName: string;

  @ViewChild('itemInput', { static: false }) itemInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  mealForm = this.fb.group({
    noOfPax: ['', [Validators.required]],
    servingDate: ['', []],
    servingTime: ['', []],
    reservationDate: ['', []],
    reservationTime: ['', []],
    price: ['', []],
    preference: ['', [Validators.required]]
  });
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
    this.isLoading = true;
    this.bookingService.getAllItemNames().subscribe(response => {
      if (response.success) {
        this.allItems = response.data['items'];
      }
    });
  }

  constructor(private fb: FormBuilder,
    private router: Router,
    private bookingService: BookingService,
    private toastr: MyToastrService) {
    this.filteredItems = this.itemCtrl.valueChanges.pipe(
      startWith(null),
      map((item: string | null) => item ? this._filter(item) : []));
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;
      if ((value || '').trim()) {
        this.selectedItems.push(value.trim());
      }
      if (input) {
        input.value = '';
      }
      this.itemCtrl.setValue(null);

    }
  }

  remove(selectedItem: string): void {
    const index = this.selectedItems.indexOf(selectedItem);
    if (index >= 0) {
      this.selectedItems.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedItems.push(event.option.viewValue);
    this.itemInput.nativeElement.value = '';
    this.itemCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allItems.filter(item => item.toLowerCase().includes(filterValue));
  }

  getNumberOfPax() {
    return this.mealForm.controls['noOfPax'].value;
  }

  getPrice() {
    return this.mealForm.controls['price'].value;
  }

  getServingDate() {
    return this.mealForm.controls['servingDate'].value;
  }

  getServingTime() {
    return this.mealForm.controls['servingTime'].value;
  }

  getReservationDate() {
    return this.mealForm.controls['reservationDate'].value;
  }

  getReservationTime() {
    return this.mealForm.controls['reservationTime'].value;
  }

  getPreference() {
    return this.mealForm.controls['preference'].value;
  }

  getSelectedItems() {
    return this.selectedItems;
  }

  submit() {
    let noOfPax = this.getNumberOfPax();
    let price = this.getPrice();
    let servingDate = moment(this.getServingDate()).format('YYYY-MM-DD')
    let servingTime = this.getServingTime();
    let servingDateTime = servingDate + "T" + servingTime + "Z";
    let reservationDate = moment(this.getReservationDate()).format('YYYY-MM-DD');
    let reservationTime = this.getReservationTime();
    let reservationDateTime = reservationDate + "T" + reservationTime + "Z";
    let preference = this.getPreference();
    let items = this.getSelectedItems();

    // console.log("noOfPax:: ", noOfPax);
    // console.log("price:: ", price);
    // console.log("servingDateTime:: ", servingDateTime);
    // console.log("reservationDateTime:: ", reservationDateTime);
    // console.log("options:: ", preference);
    // console.log("items:: ", items);

    if (noOfPax == "" || price == "" || servingDate == "" || servingTime == "" ||
      reservationDate == "" || reservationTime == "" || preference == "" ||
      noOfPax == null || price == null || servingDate == null || servingTime == null ||
      reservationDate == null || reservationTime == null || preference == null) {
      this.toastr.showErrorToast("All fields are mandatory.");
    } else if (items.length < 1) {
      this.toastr.showErrorToast("Please select one or more food items.");
    } else {
      if (!(noOfPax % 1 === 0 && noOfPax > 0)) {
        this.toastr.showErrorToast("Number of pax has to be an integer value > 0.");
      } else {
        if (!(this.getPrice() > 0)) {
          this.toastr.showErrorToast("Price must be > 0 SGD.");
        } else if (!(preference == 1 || preference == 2)) {
          this.toastr.showErrorToast("Kindly select preferred meal type.");
          // } else if (true) {
        } else {
          let result = this.compareServingAndReservationDates();
          if (result) {
            let createOrderObj = {};
            createOrderObj['maxPeopleCount'] = noOfPax;
            createOrderObj['price'] = price;
            createOrderObj['servingDate'] = servingDateTime;
            createOrderObj['reservationDeadline'] = reservationDateTime;
            createOrderObj['preferenceType'] = preference;
            let finalSuggestedItems = [];
            let otherItemsStr = "";
            this.selectedItems.forEach((element) => {
              if (this.allItems.includes(element.trim())) {
                finalSuggestedItems.push(element.trim());
              } else {
                otherItemsStr += ", " + element.trim();
              }
            });
            // let otherItemsStr = "";
            // otherItems.forEach(element => {
              
            // });
            // this.getSuggestedItems();
            createOrderObj['itemList'] = finalSuggestedItems;
            createOrderObj['otherItems'] = otherItemsStr.substring(2, otherItemsStr.length);
            this.bookingService.createNewOrder(createOrderObj).subscribe((response) => {
              if(response.success) {
                this.toastr.showSuccessToast("Successfully posted meal.");
                this.router.navigate(['home']);
              } else {
                this.toastr.showErrorToast("Some problem occurred, please try again later.");
                this.router.navigate(['home']);
              }
              
            });
          }
        }
      }
    }
  }

  compareServingAndReservationDates() {
    let servingDate = this.getServingDate();
    let servingTime = this.getServingTime();
    let reservationDate = this.getReservationDate();
    let reservationTime = this.getReservationTime();
    if (servingDate > reservationDate) {
      return true;
    } else if (servingDate < reservationDate) {
      this.toastr.showErrorToast("Kindly check the serving date and the reservation date.");
      return false;
    } else {
      if (servingTime < reservationTime) {
        this.toastr.showErrorToast("Kindly check the serving time and the reservation time.");
        return false;
      } else {
        return true;
      }
    }
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
