import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'src/models/user-login';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MyToastrService } from './my-toastr.service';
import { DataResponseDto } from 'src/models/DataResponseDto';
import { CommonResponseDto } from 'src/models/CommonResponseDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient
    ) {
  }

  // tempCall(){
  //   return this.http.get("http://13.76.131.119:8080/eatngreet/userms/user/health-check");
  // }

  // tempCall2(){
  //   return this.http.get("userms/user/health-check");
  // }

  login(loginObj: UserLogin) {
    const body = new FormData();
    body.set('username', loginObj.username);
    body.set('password', loginObj.password);
    return this.http.post(`userms/user/login`, body).pipe(catchError(this.handleError));
  }

  signup(signupObj) {
    return this.http.post<CommonResponseDto>(`userms/user/signup`, signupObj);
  }

  getLoggedInUserInfo(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem("token")
      })}
    return this.http.post(`userms/user/get-user-info`, {}, httpOptions);
  }

  getLoggedInUsersCompleteInfo() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem("token")
      })}
    return this.http.post<DataResponseDto>(`userms/user/complete-info`, {}, httpOptions);
  }
  
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = 'Some error occurred at client side.\n' + `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = 'Some error occurred at server side.\n' + `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    window.alert("Check login credentials and try again.");
    return throwError(errorMessage);
  }
}
