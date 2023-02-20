import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn:"root"})
export class AuthenticationService {
    url:string  = 'http://localhost:3000/user'
    constructor(private http:HttpClient){}


    login(username:string, password:string):Observable<any>{
      return this.http.post(this.url+'/login',{username, password});
    }

    signup(username:string, password:string):Observable<any>{
      return this.http.post(this.url+'/signup', {username, password});
    }
}
