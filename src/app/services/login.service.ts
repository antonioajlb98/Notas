import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  checked=false;
  user!: SocialUser;
  loggedIn!: boolean;
  originalPath!:string;

  constructor(private authService: SocialAuthService,
    private router:Router,private local: LocalstorageService) {

    this.isAuth();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        this.local.set('user',user);
        if(this.originalPath){
          this.router.navigate([this.originalPath]);
          this.originalPath='';
        }else
          this.router.navigate(['']);
      }else{
        this.router.navigate(['/login']);
      }
    });
   }
  isAuth():boolean{
    if(!this.checked){
      this.user = JSON.parse(this.local.get('user'));
      this.checked = true;
      this.loggedIn = (this.user != null);
    }
    return this.loggedIn;
  }
  async refreshToken(): Promise<void> {
    return this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  /*
  async signInWithGoogle():Promise<SocialUser> {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }*/
  async signOut(): Promise<void> {
    this.user = null as any;
    this.local.clear('user');
    this.checked=false;
    console.log(this.local.get('user'));
    //this.router.navigate(['login'])
    return new Promise(async (resolve,reject)=>{
      try{
         await this.authService.signOut();
         console.log("AQUI NOO OOOO")
         resolve();
      }catch(e){
        console.log("AQUI SI")
        resolve();
      }
    })
    
  }
}