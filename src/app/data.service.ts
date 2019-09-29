import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Postmeal } from './postmeal';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  private messageSource = new BehaviorSubject<Postmeal[]>(null);
  currentMessage = this.messageSource.asObservable();
  changeMessage(data: Postmeal[]) {
    this.messageSource.next(data);
    console.log(data);
  }
}
