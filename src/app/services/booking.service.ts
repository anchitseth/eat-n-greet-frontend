import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataResponseDto } from 'src/models/DataResponseDto';
import { Data } from '@angular/router';
import { CommonResponseDto } from 'src/models/CommonResponseDto';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {
  }

  getAllOrdersForListing() {
    return this.http.post<DataResponseDto>('http://137.116.139.240:8081/eatngreet/bookingms/booking/all-items', {});
  }

  getSingleProducerItem(orderId) {
    return this.http.post<DataResponseDto>('http://137.116.139.240:8081/eatngreet/bookingms/booking/single-producer-item', {"producerOrderId": orderId});
  }

  getAllItemNames() {
    return this.http.post<DataResponseDto>(`http://137.116.139.240:8081/eatngreet/bookingms/auto-suggest/all-item-names`, {});
  }

  createNewOrder(reqObj) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem("token")
      })}
    return this.http.post<CommonResponseDto>(`http://137.116.139.240:8081/eatngreet/bookingms/booking/producer-order`, reqObj, httpOptions);
  }
}
