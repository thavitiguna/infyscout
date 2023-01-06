import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{

    if(sessionStorage.getItem('sessiondata')=="success")
    {
      return true;
    }
    else{
      this.r.navigate(['/login'])
      return false;
    }
    
  }
  constructor(private r:Router) { }
}
