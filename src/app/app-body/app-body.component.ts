import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImagesService, imagesToken } from './image.service';

@Component({
  selector: 'app-app-body',
  templateUrl: './app-body.component.html',
  styleUrls: ['./app-body.component.css']
})
export class AppBodyComponent implements OnInit {

  constructor(private getImagesService:ImagesService,
     @Inject(imagesToken) public imagesSubject$:BehaviorSubject<any[]>) { }
  private unSubAll$:Subject<void>  = new Subject();

  ngOnInit(): void {
    this.getImagesService.getAllImages()
    .pipe(takeUntil(this.unSubAll$))
    .subscribe(
      (images) => {
        this.imagesSubject$.next(images);
        console.log(images)},
      (err) => console.log(err),
      () => console.log('getting Images completed !')
    )
  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSubAll$.next();
  }
}
