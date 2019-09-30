import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import * as moment from 'moment'
import { MyToastrService } from '../services/my-toastr.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formCount: number;

  constructor(private fb: FormBuilder, private router: Router, private toastr: MyToastrService, private userService: UserService) { }
  isFormOne: Boolean = true;
  iserror1: Boolean = false;
  registrationform = this.fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    mobileno: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')]],
    gender: ['', []],
    dob: ['', []],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmpassword: ['', [Validators.required]],
    address: this.fb.group({
      block: ['', [Validators.required]],
      floor: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      building: ['', [Validators.required]],
      streetname: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
    })
  });
  ngOnInit() {
    this.formCount = 1;
  }

  get fname() {
    return this.registrationform.get('firstname');
  }
  get lname() {
    return this.registrationform.get('lastname');
  }
  get email() {
    return this.registrationform.get('email');
  }
  get mobile() {
    return this.registrationform.get('mobileno');
  }
  get password() {
    return this.registrationform.get('password');
  }
  get confirmpassword() {
    return this.registrationform.get('confirmpassword');
  }
  get block() {
    return this.registrationform.get('address').get('block');
  }
  get floor() {
    return this.registrationform.get('address').get('floor');
  }
  get unit() {
    return this.registrationform.get('address').get('unit');
  }
  get building() {
    return this.registrationform.get('address').get('building');
  }
  get streetname() {
    return this.registrationform.get('address').get('streetname');
  }
  get postcode() {
    return this.registrationform.get('address').get('postcode');
  }

  goToFormOne() {
    this.formCount = 1;
  }

  goToFormTwo() {
    this.formCount = 2;
  }

  checkFormOne() {
    let isFormOneValid = true;
    if (this.registrationform.controls['firstname'].value === '' ||
      this.registrationform.controls['lastname'].value === '' ||
      this.registrationform.controls['email'].value === '' ||
      this.registrationform.controls['mobileno'].value === '' ||
      this.registrationform.controls['password'].value === '' ||
      this.registrationform.controls['confirmpassword'].value === '') {
      isFormOneValid = false;
      this.toastr.showErrorToast("Mandatory fields are missing.");
    } else {
      if (!(this.registrationform.controls['gender'].value == 1 || this.registrationform.controls['gender'].value == 2)) {
        isFormOneValid = false;
        this.toastr.showErrorToast("Please select gender.");
      } else {
        if (this.registrationform.controls['dob'].value == "") {
          isFormOneValid = false;
          this.toastr.showErrorToast("Please select dob.");
        }
      }
    }
    if (this.registrationform.controls['password'].value !== this.registrationform.controls['confirmpassword'].value) {
      isFormOneValid = false;
      this.toastr.showErrorToast("Password and Confirm Password do not match.")
    }
    if (isFormOneValid) {
      this.goToFormTwo();
    }
  }

  checkFormTwo() {
    let floorNo = this.registrationform.get('address').get('floor').value;
    let unitNo = this.registrationform.get('address').get('unit').value;
    let buildingName = this.registrationform.get('address').get('building').value;
    let streetName = this.registrationform.get('address').get('streetname').value;
    let blockNo = this.registrationform.get('address').get('block').value;
    let pincode = this.registrationform.get('address').get('postcode').value;
    let gender = "";
    if (this.registrationform.controls['gender'].value == 1) {
      gender = "M";
    } else if (this.registrationform.controls['gender'].value == 2) {
      gender = "F";
    }
    if (floorNo === '' || unitNo === '' || buildingName === '' || streetName === '' || blockNo === '' || pincode === '') {
      this.toastr.showErrorToast("Mandatory fields are missing.");
    } else {
      let signupObj =
      {
        "firstName": this.registrationform.controls['firstname'].value,
        "lastName": this.registrationform.controls['lastname'].value,
        "emailId": this.registrationform.controls['email'].value,
        "phoneNo": this.registrationform.controls['mobileno'].value,
        "gender": gender,
        "dob": moment(this.registrationform.controls['dob'].value).format('DD/MM/YYYY'),
        "password": this.registrationform.controls['password'].value,
        "confirmPassword": this.registrationform.controls['confirmpassword'].value,
        "address": {
          "blockNo": blockNo,
          "floorNo": floorNo,
          "unitNo": unitNo,
          "buildingName": buildingName,
          "streetName": streetName,
          "pincode": pincode,
          "latitude": "",
          "longitude": ""
        }
      }
      this.userService.signup(signupObj).subscribe((response) => {
        if(response.success) {
          this.toastr.showSuccessToast("Successfully signed up, please login to continue.");
          this.router.navigate(['login']);
        } else {
          this.toastr.showErrorToast(response.message);
        }
      })
    }
  }
  redirectToLogin() {
    this.router.navigate(['login']);
  }
}