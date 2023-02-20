import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { imageIdToDeleteToken } from 'src/app/app-body/image.service';
import { AppImageDeleteComponent } from '../app-image-delete/app-image-delete.component';

@Component({
  selector: 'app-image-display',
  templateUrl: './app-image-display.component.html',
  styleUrls: ['./app-image-display.component.css']
})
export class AppImageDisplayComponent implements OnInit {

  @Input() index:number | undefined;

  @Input() backgroundUrl:string | undefined;

  @Input() imageLabel:string | undefined;

  @Input() id:string | undefined;


  constructor(@Inject(imageIdToDeleteToken) public imageToDeleteId$:BehaviorSubject<string>,
    private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  onHover(img:HTMLElement, btn:HTMLElement, paragraphe:HTMLElement){
    img.classList.add('imageHover');
    btn.style.display = 'inline';
    paragraphe.style.display = 'inline';
  }
  onOut(img:HTMLElement, btn:HTMLElement, paragraphe:HTMLElement){
    btn.style.display = 'none';
    paragraphe.style.display = 'none';
    img.classList.remove('imageHover');
  }

  onDeleteImage(imageId:string | undefined){
    this.modalService.open(AppImageDeleteComponent);
    this.imageToDeleteId$.next(imageId || '');
  }
}
