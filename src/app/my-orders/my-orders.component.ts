import { PostmealserService } from './../postmealser.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { PostedOrder } from '../posted-order';
import { BookedOrder } from '../booked-order';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
public bookedorder: BookedOrder[];
public postedorder: PostedOrder[];

  constructor(private router: Router, private bookser: PostmealserService) { }
  /*myorders =[
    {"bookingid":1,"producername":"A","consumername":"X","location":"WestGate 600048","DateTime":"17/9/2019","preferredoption":"DineIn","PaidStatus":"Unpaid","Amount":150},
    {"bookingid":2,"producername":"B","consumername":"y","location":"WestGate 600048","DateTime":"17/9/2019","preferredoption":"DineIn","PaidStatus":"paid","Amount":150},
    {"bookingid":2,"producername":"C","consumername":"z","location":"WestGate 600048","DateTime":"17/9/2019","preferredoption":"DineIn","PaidStatus":"Unpaid","Amount":150},
    {"bookingid":4,"producername":"D","consumername":"a","location":"WestGate 600048","DateTime":"17/9/2019","preferredoption":"DineIn","PaidStatus":"paid","Amount":150}

]*/
isbookedorder:boolean=false;
ispostedorder:boolean=false;
/*bookedorder=[{
  "BookingId":1,
  "firstName":"Aparna",
  "lastName":"Gottumukala",
  "itemList":[{
  "id":1,
  "name":"Puri"
  },
  {
  "id":2,
  "name":"chenna"
  }
  ],
  address:[{
  "blockNo":108,
  "FloorNo":8,
  "UnitNo":64,
  "StreetName":"West Avenue 6",
  "BuildingName":"Cho chu Kang",
  "postCode":60048}],
  "phone":"9008743",
  "servingDate":"18/9/2019 7:00PM",
  "price":10,
  "preferenceType":"Dine In"
  }];
postedorder = [{
  "producerOrderId":1,
  "firstName":"Aparna",
  "lastName":"Gottumukala",
  "itemList":[{
  "id":1,
  "name":"Puri"
  },
  {
  "id":2,
  "name":"chenna"
  }
  ],
  address:[{
  "blockNo":108,
  "FloorNo":8,
  "UnitNo":64,
  "StreetName":"West Avenue 6",
  "BuildingName":"",
  "postCode":60048}],
  imageUrls:[{
  "id":""}],
  imageThumbnailUrls:[{
  "id":""}],
  "servingDate":"18/9/2019 7:00PM",
  "reservationdeadline":"18/9/2019 12:00PM",
  "paymentdeadline":"18/9/2019 5:00PM",
  "price":10,
  "maxPeopleCount":15,
  "actualPeopleCount":13,
  "preferenceType":"Dine In",
  "otherItems":"",
  "note":""},
  {
    "producerOrderId":2,
    "firstName":"Aparna",
    "lastName":"Gottumukala",
    "itemList":[{
    "id":3,
    "name":"veg briyani"
    },
    {
    "id":4,
    "name":"raitha"
    }
    ],
    address:[{
    "blockNo":108,
    "FloorNo":8,
    "UnitNo":64,
    "StreetName":"West Avenue 6",
    "BuildingName":"",
    "postCode":60048}],
    imageUrls:[{
    "id":""}],
    imageThumbnailUrls:[{
    "id":""}],
    "servingDate":"18/9/2019 7:00PM",
    "reservationdeadline":"18/9/2019 12:00PM",
    "paymentdeadline":"18/9/2019 5:00PM",
    "price":10,
    "maxPeopleCount":10,
    "actualPeopleCount":8,
    "preferenceType":"Takeaway",
    "otherItems":"",
    "note":""}];
bookedorder=[{
  "BookingId":1,
  "firstName":"Aparna",
  "lastName":"Gottumukala",
  "itemList":[{
  "id":1,
  "name":"Puri"
  },
  {
  "id":2,
  "name":"chenna"
  }
  ],
  address:[{
  "blockNo":108,
  "FloorNo":8,
  "UnitNo":64,
  "StreetName":"West Avenue 6",
  "BuildingName":"Cho chu Kang",
  "postCode":60048}],
  "phone":"9008743",
  "servingDate":"18/9/2019 7:00PM",
  "price":10,
  "preferenceType":"Dine In"
  }];
postedorder = [{
  "producerOrderId":1,
  "firstName":"Aparna",
  "lastName":"Gottumukala",
  "itemList":[{
  "id":1,
  "name":"Puri"
  },
  {
  "id":2,
  "name":"chenna"
  }
  ],
  address:[{
  "blockNo":108,
  "FloorNo":8,
  "UnitNo":64,
  "StreetName":"West Avenue 6",
  "BuildingName":"",
  "postCode":60048}],
  imageUrls:[{
  "id":""}],
  imageThumbnailUrls:[{
  "id":""}],
  "servingDate":"18/9/2019 7:00PM",
  "reservationdeadline":"18/9/2019 12:00PM",
  "paymentdeadline":"18/9/2019 5:00PM",
  "price":10,
  "maxPeopleCount":15,
  "actualPeopleCount":13,
  "preferenceType":"Dine In",
  "otherItems":"",
  "note":""},
  {
    "producerOrderId":2,
    "firstName":"Aparna",
    "lastName":"Gottumukala",
    "itemList":[{
    "id":3,
    "name":"veg briyani"
    },
    {
    "id":4,
    "name":"raitha"
    }
    ],
    address:[{
    "blockNo":108,
    "FloorNo":8,
    "UnitNo":64,
    "StreetName":"West Avenue 6",
    "BuildingName":"",
    "postCode":60048}],
    imageUrls:[{
    "id":""}],
    imageThumbnailUrls:[{
    "id":""}],
    "servingDate":"18/9/2019 7:00PM",
    "reservationdeadline":"18/9/2019 12:00PM",
    "paymentdeadline":"18/9/2019 5:00PM",
    "price":10,
    "maxPeopleCount":10,
    "actualPeopleCount":8,
    "preferenceType":"Takeaway",
    "otherItems":"",
    "note":""}];*/
  ngOnInit() {
   
    this.bookser.getbookedmeal().subscribe(
      (data) => { this.bookedorder = data;
        console.log(this.bookedorder);
      }
    );
    this.bookser.getpostmealorder().subscribe(
      (data) => {this.postedorder = data;
      console.log(this.postedorder);
      }
    );
    this.checkorder();
  }
  checkorder() {
    if(this.postedorder.length === 0) {
      this.ispostedorder = true;
    } else {
      this.ispostedorder = false;
    }
    if(this.bookedorder.length === 0) {
      this.isbookedorder = true;
    } else {
      this.isbookedorder = false;
    }
  }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
  orders() {
   this.router.navigateByUrl('/myorders');
  }
  postMeal()  {
    this.router.navigateByUrl('/postmeal');
   }
   homeitself() {
    this.router.navigateByUrl('/home');
   }
 /*  Profile() {
     this.router.navigateByUrl('/profile');
   }*/
}
