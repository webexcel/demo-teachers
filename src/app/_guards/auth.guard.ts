import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StorageService } from '../service/storage.service';


@Injectable({ providedIn: "root" })
export class Guard implements CanActivate {
  constructor(public router:Router,private storage: StorageService ) { 
    
  }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let val = this.storage.getjson('teachersDetail')
      if(!val){
        this.router.navigate(['login']);
       }else{
        return true;
       }
    }
  }

@Injectable({ providedIn: "root" })
export class loginGuard implements CanActivate {
  constructor(public router:Router,private storage: StorageService) { 
    
  }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let val = this.storage.getjson('teachersDetail')
      if(val){
        this.router.navigate(['dashboard']);
      }else{
        return true;
      }
    }
}
