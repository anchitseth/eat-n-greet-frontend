import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UserLogin } from 'src/models/user-login';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MyToastrService } from './my-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private myToastr: MyToastrService
    ) {
  }

  login(loginObj: UserLogin) {
    const body = new FormData();
    body.set('username', loginObj.username);
    body.set('password', loginObj.password);
    return this.http.post(`http://23.97.53.91:8080/eatngreet/userms/user/login`, body).pipe(catchError(this.handleError));
  }

  getLoggedInUserInfo(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + sessionStorage.getItem("token")
      })}
    return this.http.post(`http://23.97.53.91:8080/eatngreet/userms/user/get-user-info`, {}, httpOptions);
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
    this.myToastr.showErrorToast("Check login credentials and try again.");
    return throwError(errorMessage);
  }
}
