import { Injectable, OnInit } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

import { HttpClient } from  '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<any> | Promise<any> {
    console.log('==>', route);
    return new Promise((resolve) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        resolve(true);
        } else {
        this.router.navigate(['/login']);
        resolve(false);
        }
    })
  }
}

