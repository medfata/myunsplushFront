import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  NgbAlertModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppBodyComponent } from './app-body/app-body.component';
import { AppImageDisplayComponent } from './shared/app-image-display/app-image-display.component';
import { AppImageCreateComponent } from './shared/app-image-create/app-image-create.component';
import { AppImageDeleteComponent } from './shared/app-image-delete/app-image-delete.component';
import { LoginComponent } from './app-login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppSignupComponent } from './app-signup/app-signup.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { imageIdToDeleteSubject$, imageIdToDeleteToken, imagesSubject$, imagesToken } from './app-body/image.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppBodyComponent,
    AppImageDisplayComponent,
    AppImageCreateComponent,
    AppImageDeleteComponent,
    LoginComponent,
    AppSignupComponent,
    AppHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbAlertModule,
    NgbModalModule
  ],
  providers: [{provide:imagesToken, useValue:imagesSubject$}, {provide:imageIdToDeleteToken, useValue:imageIdToDeleteSubject$}],
  bootstrap: [AppComponent]
})
export class AppModule { }
