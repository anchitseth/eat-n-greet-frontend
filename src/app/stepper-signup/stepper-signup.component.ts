import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder, Validator, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stepper-signup',
  templateUrl: './stepper-signup.component.html',
  styleUrls: ['./stepper-signup.component.css']
})
export class StepperSignupComponent implements OnInit {

  formNumber: number;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService) { }
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
    this.formNumber = 1;
  }

  checkpass() {
    console.log('selected change');
    if (this.registrationform.controls['password'].value !== '') {
      if (this.registrationform.controls['password'].value !== this.registrationform.controls['confirmpassword'].value) {
        this.iserror1 = true;
      }
      else {
        this.iserror1 = false;
      }
    }
  }
  toggeleFormPage() {
    this.isFormOne = this.isFormOne ? false : true;
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

  passwordMatchValidator() {
    return this.registrationform.controls['password'].value ===
      this.registrationform.controls['confirmpassword'].value ? null : { 'mismatch': true };
  }
  /*testlogin() {
    this.router.navigate(['login']);
  }*/
  testrequired() {
    this.registrationform.controls['firstname'].value === null ? { 'iserror': true } : { 'iserror': false };
  }
  checkValid() {
    if (this.registrationform.controls['firstname'].value === '') {
      this.toastr.error("first name missing");
    }
    if (this.registrationform.controls['lastname'].value === '') {
      this.toastr.error("last name missing");
    }
    if (this.registrationform.controls['email'].value === '') {
      this.toastr.error("email missing");
    }
    if (this.registrationform.controls['mobileno'].value === '') {
      this.toastr.error("mobile number missing");
    }
    if (this.registrationform.controls['password'].value === '') {
      this.toastr.error("password missing");
    }
    if (this.registrationform.controls['confirmpassword'].value === '') {
      this.toastr.error("confirm password missing");
    }
    if (this.registrationform.get('address').get('block').value === '') {
      this.toastr.error("block number is missing");
    }
    if (this.registrationform.get('address').get('floor').value === '') {
      this.toastr.error("floor number is missing");

    }
    if (this.registrationform.get('address').get('unit').value === '') {
      this.toastr.error("unit number is missing");
    }
    if (this.registrationform.get('address').get('building').value === '') {
      this.toastr.error("building name is missing");
    }
    if (this.registrationform.get('address').get('streetname').value === '') {
      this.toastr.error('streetname is missing');
    }
    if (this.registrationform.get('address').get('postcode').value === '') {
      this.toastr.error('post code is missing');
    }
  }
  onSubmit() {


    console.log(this.registrationform.controls['firstname'].value);
    console.log(this.registrationform.controls['lastname'].value);
    console.log(this.registrationform.controls['email'].value);
    console.log(this.registrationform.controls['mobileno'].value);
    console.log(this.registrationform.controls['password'].value);
    console.log(this.registrationform.controls['confirmpassword'].value);
    console.log(this.registrationform.get('address').get('block').value);
    console.log(this.registrationform.get('address').get('floor').value);
    console.log(this.registrationform.get('address').get('unit').value);
    console.log(this.registrationform.get('address').get('building').value);
    console.log(this.registrationform.get('address').get('streetname').value);
    console.log(this.registrationform.get('address').get('postcode').value);





    if (this.registrationform.valid) {
      console.log("Successfully signed up.");
      //show toast and redirect to login
      // this.router.navigate(['/login']);
    } else {
      console.log('form not valid');
    }
  }

  goToFormOne() {
    this.isFormOne = true;
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
      this.toastr.error("Mandatory fields are missing.");
    } else {
      if (!(this.registrationform.controls['gender'].value == 1 || this.registrationform.controls['gender'].value == 2)) {
        isFormOneValid = false;
        this.toastr.error("Please select gender.");
      } else {
        if (this.registrationform.controls['dob'].value == "") {
          this.toastr.error("Please select dob.");

        }
      }
    }
  }
}