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



@Component({
  selector: 'app-newpostmeal',
  templateUrl: './newpostmeal.component.html',
  styleUrls: ['./newpostmeal.component.css']
})
export class NewpostmealComponent implements OnInit {

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

  ngOnInit() {
    this.isLoading = true;
    this.bookingService.getAllItemNames().subscribe(response => {
      if (response.success) {
        this.allItems = response.data['items'];
      }
    });
  }

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private bookingService: BookingService) {
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
      this.showErrorToast("All fields are mandatory.");
    } else if (items.length < 1) {
      this.showErrorToast("Please select one or more food items.");
    } else {
      if (!(noOfPax % 1 === 0 && noOfPax > 0)) {
        this.showErrorToast("Number of pax has to be an integer value > 0.");
      } else {
        if (!(this.getPrice() > 0)) {
          this.showErrorToast("Price must be > 0 SGD.");
        } else if (!(preference == 1 || preference == 2)) {
          this.showErrorToast("Kindly select preferred meal type.");
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
              console.log("Received response: ", response);
              
            });
          }
        }
      }
    }
  }

  // // getSuggestedItems() {
  // //   // this.selectedItems that are in this.allItems
  // //   let finalSuggestedItems = [];
  // //   let otherItems = [];
  // //   this.selectedItems.forEach((element) => {
  // //     if (this.allItems.includes(element.trim())) {
  // //       console.log(element, ".", " is there in the suggested items.");
  // //       finalSuggestedItems.push(element.trim());
  // //     } else {
  // //       otherItems.push(element.trim());
  // //       console.log(element, ".", " is not there in the suggested items.");

  // //     }
  // //   });
  // // }

  // getOtherItems() {
  //   // this.selectedItems - this.allItems
  // }


  compareServingAndReservationDates() {
    let servingDate = this.getServingDate();
    let servingTime = this.getServingTime();
    let reservationDate = this.getReservationDate();
    let reservationTime = this.getReservationTime();
    if (servingDate > reservationDate) {
      return true;
    } else if (servingDate < reservationDate) {
      this.showErrorToast("Kindly check the serving date and the reservation date.");
      return false;
    } else {
      // console.log("dates same hain.");
      if (servingTime < reservationTime) {
        this.showErrorToast("Kindly check the serving time and the reservation time.");
        // console.log("dates same hain, but time ki vajah se nhi ho paega.");
        return false;
      } else {
        return true;
      }
    }
  }


  //earliest meal can be booked for 4 hours from the current time

  private showErrorToast(message: string, heading: string = "", duration: number = 3000) {
    this.toastr.error(message, heading, { timeOut: duration })
  }

  private showSuccessToast(message: string, heading: string = "", duration: number = 3000) {
    this.toastr.success(message, heading, { timeOut: duration })
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
  wallet() {
    this.router.navigateByUrl('/wallet');
  }
  homeitself() {
    this.router.navigateByUrl('/home');
  }
}
