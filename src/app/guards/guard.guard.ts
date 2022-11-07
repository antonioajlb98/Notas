import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { SocialUser } from '@abacritt/angularx-social-login';
import { LocalstorageService } from '../services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  private _originalPath!:string;
  constructor(private router:Router,private loginS:LoginService,private localS: LocalstorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let login = false;
      let user:SocialUser = JSON.parse(this.localS.get('user'));
      if(user!=null){
        this.loginS.user = user;
        this.loginS.refreshToken();
        login=true;
      }

      let result=false;
      if(!login){
        //Not Logged
        if(route.url[0].toString()!='login'){
          //you're not logged?, ---> not alowed --> go login
          this.loginS.originalPath=route.url[0].toString();
          this.router.navigate(['/login']);
        }else{
          result=true;
        }
      }else{
        //Logged
        if(route.url[0].toString()=='login'){
          //again in login?, ---> not alowed
          this.router.navigate(['']);
        }else{
          result=true;
        }
      }
      return result;
  }
}