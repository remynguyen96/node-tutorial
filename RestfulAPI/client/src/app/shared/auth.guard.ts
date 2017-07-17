import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from "./global.service";
import { Router } from "@angular/router";
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private globalService : GlobalService,
    private router : Router,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
     return this.verifiedAuth();
  }
  verifiedAuth() : boolean{
    if(this.globalService.isAuthenticated){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }



}
