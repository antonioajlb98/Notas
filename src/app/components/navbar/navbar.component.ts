import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,public loginService:LoginService,private translate:TranslateService) { }

  ngOnInit(): void {
  }
  async cerrarSesion(){
    localStorage.removeItem('user');
    await  this.loginService.signOut();
    this.router.navigate(['login'])
  }
  cambiarEspanol(){
    this.translate.use('es');
  }
  changeToEnglish(){
    this.translate.use('en');
  }
}
