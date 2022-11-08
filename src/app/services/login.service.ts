import { Injectable } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { GoogleLoginProvider } from "@abacritt/angularx-social-login";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  checked=false;
  user!: SocialUser;
  loggedIn!: boolean;
  originalPath!:string;

  constructor(private authService: SocialAuthService,
    private router:Router) {

    this.isAuth();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if(this.loggedIn){
        localStorage.setItem('user', JSON.stringify(this.user));
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
      this.user = JSON.parse(localStorage.getItem('user')!);
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
    localStorage.removeItem('user');
    this.checked=false;
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