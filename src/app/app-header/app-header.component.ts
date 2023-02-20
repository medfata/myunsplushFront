import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AppImageCreateComponent } from '../shared/app-image-create/app-image-create.component';
import { ImagesService, imagesToken } from '../app-body/image.service';
import { debounceTime, filter, first, map, skip, switchMap, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  public OpenModal$:Subject<void> = new Subject<void>();

  username:string | null= '';
  unSubToAll$:Subject<void> = new Subject();
  term$:BehaviorSubject<string> = new BehaviorSubject('');
  result$:Observable<any[] | undefined>  | undefined = this.term$.pipe(
    debounceTime(1000),
    filter(value => value !== ''),
    switchMap(term => this.imageService.getByLabelTerm(term).pipe(
      takeUntil(this.term$.pipe(skip(1)))
      ))
  )
  getAllIfEmpty:Observable<any[]> | undefined = this.term$.pipe(
    debounceTime(1000),
    filter(value  => value === ''),
    switchMap(term => this.imageService.getAllImages().pipe(
      takeUntil(this.term$.pipe(skip(1)))
    ))
  )


  constructor(private modalService:NgbModal, private imageService:ImagesService,
    @Inject(imagesToken) private imagesSubject$:BehaviorSubject<any[]>) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');


    this.result$?.pipe(takeUntil(this.unSubToAll$)).subscribe(
      (filterdImages) =>
    this.imagesSubject$.next(filterdImages || [])

    )
    this.getAllIfEmpty?.pipe(takeUntil(this.unSubToAll$)).subscribe(
      (allImages) =>  this.imagesSubject$.next(allImages)
    )
  }


  OpenCreateImageModal(){
    this.modalService.open(AppImageCreateComponent);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.unSubToAll$.next();
  }
}
