import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, InjectionToken } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({providedIn:"root"})
export class ImagesService{

  constructor(private http:HttpClient){}

  private endPoint:string = "http://localhost:3000/api/image"

  getAllImages():Observable<any>{
    // let ownerid = sessionStorage.getItem('userid');

    // let headers = new HttpHeaders({ 'ownerid': ownerid || ''});

    return this.http.get(`${this.endPoint}/All`);

  }
  getByLabelTerm(labelTerm:string):Observable<any>{
    // let ownerid = sessionStorage.getItem('userid');

    // let headers = new HttpHeaders({ 'ownerid': ownerid || ''});

    return this.http.get(`${this.endPoint}/LabelTerm/${labelTerm}`)
  }

  deleteImageById(imageId:string, password:string):Observable<any>{
    // let ownerid = sessionStorage.getItem('userid');

    // let headers = new HttpHeaders({ 'ownerid': ownerid || ''});

    return this.http.delete(`${this.endPoint}/remove/${imageId}` )
  }

}

export const imagesToken = new InjectionToken<BehaviorSubject<any[]>>('images');
export const imagesSubject$ = new BehaviorSubject<any[]>([]);

export const imageIdToDeleteToken = new InjectionToken<BehaviorSubject<string>>('imageIdToDelete');
export const imageIdToDeleteSubject$ = new BehaviorSubject<string>('');
