import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MyToastrService {

  constructor(private toastr: ToastrService) {

  }
  showErrorToast(message: string, heading: string = "", duration: number = 3000) {
    this.toastr.error(message, heading, { timeOut: duration })
  }

  showSuccessToast(message: string, heading: string = "", duration: number = 3000) {
    this.toastr.success(message, heading, { timeOut: duration })
  }
}
