import { Subject } from 'rxjs';
import {delay, takeUntil} from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router) { }

  ngOnInit(): void {
  }
  isSaving:boolean  = false;
  isError:boolean = false;
  unSubToAll:Subject<void>  =  new Subject();
  login(loginForm:NgForm){
    let user = loginForm.form.value;
    this.isSaving = true;
    this.isError = false;
    setTimeout(() => {
      this.authService.login(user.username, user.password)
      .pipe(takeUntil(this.unSubToAll))
      .subscribe(
        comingUser => {
          this.isSaving = false;
           sessionStorage.setItem('userid',comingUser._id);
           sessionStorage.setItem('username', comingUser.username);
           this.router.navigateByUrl('/home');
          },
        err => { this.isSaving = false;
          this.isError = true;
        },
        () =>{ console.log('login completed !', this.isSaving = false)}
      );
    }, 2000)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSubToAll.next();
  }
}
