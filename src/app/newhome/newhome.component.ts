import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DataService } from "../data.service";
import { Postmeal } from '../postmeal';
import { PostmealserService } from '../postmealser.service';
import { UserService } from '../services/user.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-newhome',
  templateUrl: './newhome.component.html',
  styleUrls: ['./newhome.component.css']
})
export class NewhomeComponent implements OnInit {
  message: string;
  public userinfo: Postmeal[] = [];
  obj: any;
  isLoading: boolean = false;
  firstName: string;
  lastName: string;
  orderList: any[];

  constructor(private router: Router,
    private userService: UserService,
    private bookingService: BookingService,

    // private data: DataService,
    // private post: PostmealserService) { }
  ){}
  ngOnInit() {
    this.isLoading = true;
    this.userService.getLoggedInUserInfo().subscribe((response) => {
      this.firstName = response['data']['firstName'];
      this.lastName = response['data']['lastName'];
      sessionStorage.setItem("firstName", this.firstName);
      sessionStorage.setItem("lastName", this.lastName);
    });

    this.bookingService.getAllOrdersForListing().subscribe((response) => {
      
      if(response.success) {
        this.orderList = response.data['producerOrders'];
      }
      console.log(this.orderList);
      this.isLoading = false;
    });

  }

  viewOrderDetails(orderId){
    console.log("You're trying to fetch info of order: ", orderId);
    this.router.navigate(['meal-details/' + orderId]);
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
  // newMessage(user1: Postmeal[]) {
  //   this.data.changeMessage(user1);
  // }
  bookmeal() {
    this.router.navigateByUrl('/bookameal');
  }
  profile() {
    console.log("profilebutton");
    this.router.navigate(['/profile']);
  }
}
