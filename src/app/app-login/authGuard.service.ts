import { Injectable } from "@angular/core";
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";


@Injectable({providedIn:'root'})
export class AuthenticationGuard implements CanActivate {

    constructor(private router:Router){}

  canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    let userId = Boolean(sessionStorage.getItem('userid'));
    if(userId === false){
      this.router.navigateByUrl('/login');
    }
    return Boolean(userId);
  }
}
