import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Postmeal } from './postmeal';
import { BookedOrder } from './booked-order';
import { PostedOrder } from './posted-order';

@Injectable({
  providedIn: 'root'
})
export class PostmealserService {

  constructor(private http: HttpClient) { }
url = './assets/postmeal.json';
url1 = './assets/bookedorder.json';
url2 = './assets/postedorder.json';

getpostmeal(): Observable<Postmeal[]> {
  return this.http.get<Postmeal[]>(this.url);
}
getbookedmeal(): Observable<BookedOrder[]> {
  return this.http.get<BookedOrder[]>(this.url1);
}
getpostmealorder(): Observable<PostedOrder[]> {
  return this.http.get<PostedOrder[]>(this.url2);
}
}
