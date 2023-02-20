import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({providedIn:"root"})
export class ImageCreateService{
  private endPoint:string = "http://localhost:3000/api/image"
  constructor(private http:HttpClient){}

  uploadFile(label:string, imageUrl:string):Observable<any>{
    // let ownerid = sessionStorage.getItem('userid');

    // let headers = new HttpHeaders({ 'ownerid': ownerid || ''});

     return this.http.post(`${this.endPoint}/create`, {label, sourceUrl: imageUrl});

  }
}
