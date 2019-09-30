import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataResponseDto } from 'src/models/DataResponseDto';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  getUserBalance() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem("token")
      })}
    return this.http.post<DataResponseDto>('paymentms/pay/get-balance', {}, httpOptions);
  }
}
