import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImagesService, imagesToken } from 'src/app/app-body/image.service';
import { ImageCreateService } from './app-image-create.service';

@Component({
  selector: 'app-image-create',
  templateUrl: './app-image-create.component.html',
  styleUrls: ['./app-image-create.component.css']
})
export class AppImageCreateComponent implements OnInit {

  constructor( public activeModal:NgbActiveModal,
     private imageCreateService:ImageCreateService,
     private imagesService:ImagesService,
     @Inject(imagesToken) private imagesSubject$:BehaviorSubject<any[]>) { }

  private unSubToAll$:Subject<void> = new Subject();

  isSaving:boolean = false;
  isError:boolean = false;
  Errors:any[] = [];




  ngOnInit(): void {

  }

  saveImage(ImageForm:NgForm){
    let formValue = ImageForm.form.value;
    this.isSaving = true;
    this.imageCreateService.uploadFile(formValue.label, formValue.imageUrl)
    .pipe(takeUntil(this.unSubToAll$))
    .subscribe(
      (res) => {
        this.imagesService.getAllImages().pipe(takeUntil(this.unSubToAll$)).subscribe(
          (newResult) =>{
            this.imagesSubject$.next(newResult);
             this.isSaving = false;
           setTimeout(() =>  this.activeModal.dismiss() , 1000);
            }
        )
      },
      (err) => {
        this.isError = true;
        this.isSaving = false;
        console.log(err)
      },
      () => console.log('post of uploading image completed')
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSubToAll$.next();
  }


}
