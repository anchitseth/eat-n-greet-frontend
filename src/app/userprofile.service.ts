import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iuserprofile } from './userdetails';
import { tap, catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserprofileService {

  constructor(private http: HttpClient) { }
  url: string = './assets/userdetails.json';
  getUserDetails(): Observable<Iuserprofile[]> {
    return this.http.get<Iuserprofile[]>(this.url)
    .pipe(
      tap(data => console.log(data)));
  }
}
