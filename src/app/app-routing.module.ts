import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { AuthenticationGuard } from './app-login/authGuard.service';
import { LoginComponent } from './app-login/login.component';
import { AppSignupComponent } from './app-signup/app-signup.component';

const routes: Routes = [
  //{component: LoginComponent, path:'login'},
  //{component: AppSignupComponent, path:'signup'},
  {component:AppHomeComponent, path:'home'},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
