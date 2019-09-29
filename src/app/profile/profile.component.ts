import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  showMainContent: Boolean = true;
  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }
  registrationform = this.fb.group({
    fname: ['', []],
    lname: ['', []],
    email: ['', [ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    mobileno: ['', [ Validators.minLength(8), Validators.pattern('^[0-9]*$')]],
    gender: ['', []],
    dob: ['', []],
    password: ['', [Validators.minLength(8)]],
    changepassword: ['', []],
    address: this.fb.group({
      block: ['', []],
      floor: ['', []],
      unit: ['', []],
      building: ['', []],
      streetname: ['', []],
      postcode: ['', []],
    })
  });
  ngOnInit() {
    
  }
  UserDetails  = [
    {
      fname: 'Aparna',
  lname: 'Gottumukala',
  email: 'poojars34@gmail.com',
  mobileno: '90674523',
  gender: 'female',
  dob: '14/02/1995',
  address:[{
    block:"108",
    floor:"8",
    unit:"64",
    streetname:"West Avenue 6",
    building:"Cho chu Kang",
    postCode:60048}],
  password: 'demo12345'
    }
  ];
 
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
  waller() {
    this.router.navigateByUrl('/wallet');
  }
  homeitself() {
    this.router.navigateByUrl('/home');
  }
  save(){
    console.log(this.registrationform);
    this.toastr.success("Saved Successfully");
  }
}
