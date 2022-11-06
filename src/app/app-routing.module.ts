import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './components/config/config.component';
import { Error404Component } from './components/error404/error404.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/guard.guard';

const routes: Routes = [
  {path: 'home', component:HomeComponent ,
  canActivate:[LoginGuard]},
  {path: 'config', component:ConfigComponent},
  {path: 'login', component:LoginComponent,
  canActivate:[LoginGuard]},
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'**', component:Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
