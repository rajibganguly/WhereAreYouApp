import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyRestCallServiceService {

  constructor(private http: HttpClient) {}

  getReturnGeoCalls() {
    return this.http.get('https://extreme-ip-lookup.com/json/');
  }
}
