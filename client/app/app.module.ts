import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

import { COMPONENT_DECLARATIONS } from './components/componentlist';
import { SERVICE_DECLARATIONS } from './services/servicelist';

import { AlertComponent } from './directives/index';

//installed modules
import { ModalModule } from 'ng2-bootstrap';
import { AgmCoreModule } from "angular2-google-maps/core";


import {
  UserLoginGuard, GuestGuard,
  AdminLoginGuard, VendorLoginGuard
} from './guards/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyD7UAWwbYiO3Xjdp8nES-xp8h7s3YY7jjc",
      libraries: ["places"]
    }),
  ],
  declarations: [
    AppComponent,
    ...COMPONENT_DECLARATIONS,
    AlertComponent

  ],
  providers: [
    ...SERVICE_DECLARATIONS,
    UserLoginGuard, GuestGuard,AdminLoginGuard,
    VendorLoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }