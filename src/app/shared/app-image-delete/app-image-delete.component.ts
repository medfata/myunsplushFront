import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, first, takeUntil } from 'rxjs/operators';
import { imageIdToDeleteToken, ImagesService, imagesToken } from 'src/app/app-body/image.service';

@Component({
  selector: 'app-image-delete',
  templateUrl: './app-image-delete.component.html',
  styleUrls: ['./app-image-delete.component.css']
})
export class AppImageDeleteComponent implements OnInit {

  constructor(
      public activatedModal:NgbActiveModal,
      private imageService:ImagesService,
      @Inject(imageIdToDeleteToken) private imageToDeleteId$:BehaviorSubject<string>,
      @Inject(imagesToken) private imagesSubject$:BehaviorSubject<any[]> ) { }


    latestImageId:string = '';
    isDeleting:boolean = false;
    isError:boolean = false;
    Error:string = '';
    unSubToAll$:Subject<void> = new Subject();

  ngOnInit(): void {
    this.imageToDeleteId$
    .pipe(takeUntil(this.unSubToAll$))
    .subscribe(id => {this.latestImageId = id; console.log(id)})
  }

  deleteImage(deleteImageForm:NgForm){
    //needs to delete an Image : password + userId + imaageId
    let password = deleteImageForm.form.value.password;
    this.isDeleting = true;
    this.Error = '';
    this.isError = false;
    this.imageService.deleteImageById(this.latestImageId, password)
    .pipe(takeUntil(this.unSubToAll$), delay(2000))
    .subscribe(
      (res) => {console.log(res);
        this.isDeleting = false;
        this.imagesSubject$
        .pipe(
          first()//take first sub then complete so we don't get into a loop
          )
        .subscribe(
          (images) => {
            this.imagesSubject$.next(images.filter(image => image._id != this.latestImageId))
            this.activatedModal.close();
          },
        )
      },
      (err) =>{
        console.log(err);
        this.isDeleting = false;
        this.isError = true;
        this.Error = err.error;
      },
      () => console.log('deleting image completed !')
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSubToAll$.next();
  }

}
