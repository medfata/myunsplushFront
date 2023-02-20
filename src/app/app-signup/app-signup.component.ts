import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { map, delay, mergeMap, takeUntil, tap, repeatWhen } from 'rxjs/operators';
import { AuthenticationService } from '../app-login/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-signup',
  templateUrl: './app-signup.component.html',
  styleUrls: ['./app-signup.component.css']
})
export class AppSignupComponent implements OnInit {


  unSubtoAll$:Subject<void> = new Subject();
  isSaving:boolean = false;
  isError:boolean = false;
  Errors:any[] = [];
  submitedUserName:string = '';

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {

  }

  signUp(signUpForm:NgForm){
    let newUser = signUpForm.form.value;
    this.isSaving = true;
    this.isError = false;
    setTimeout(() =>
    this.authService.signup(newUser.username, newUser.password).pipe(
      takeUntil(this.unSubtoAll$)
    ).subscribe(
      (newUser:any) =>
      {this.isSaving = false;
      sessionStorage.setItem('userid', newUser._id);
      sessionStorage.setItem('username', newUser.username);
      console.log('new user was created')
      this.router.navigateByUrl('/home')
      },
      (err) => { console.log(err)
      this.isSaving = false;
      this.isError = true;
      this.Errors = err.error.errors.map((err:any) => err.msg);
    },
      () => console.log('sign up comleted !')
    ), 2000)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSubtoAll$.next();
  }
}
