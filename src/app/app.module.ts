import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewItemComponent } from './new-item/new-item.component';
import { MainComponent } from './main/main.component';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from './checkout/checkout.component';

import {  HttpClientModule } from "@angular/common/http";
import { TagService } from './_services/tag.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { LogoutComponent } from './logout/logout.component';
import { EditCertificateComponent } from './edit-certificate/edit-certificate.component';
import { ForbiddenComponent } from './errors/forbidden/forbidden.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ItemCostPipe } from './shared/pipe/item-cost.pipe';


const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  }
]

@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    NewItemComponent,
    MainComponent,
    DetailsComponent,
    CheckoutComponent,
    LogoutComponent,
    EditCertificateComponent,
    ForbiddenComponent,
    NotFoundComponent,
    ItemCostPipe
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatFileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    InfiniteScrollModule,
    NgxSpinnerModule,
    CommonModule
  ],
  providers: [TagService,
  ],
  bootstrap: [AppComponent],
  exports: [RouterModule]
})
export class AppModule { }
