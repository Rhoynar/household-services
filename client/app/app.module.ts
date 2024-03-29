import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routes';

import { AlertComponent } from './directives/index';

import {
  TopnavComponent, LandingComponent, LoginComponent,
  SignupComponent, DashboardComponent, PackagesComponent,
  UserprofileComponent, TokenComponent, PackagessectionComponent,
  footerSectionComponent, EditprofileComponent, StripesComponent,
  ServicesComponent, OrdersComponent, LandingOneComponent,
  TopnavOneComponent,PackagePurchaseComponent,AdminLoginComponent,
  AdminDashboardComponent,AdminTopnavComponent,VendorComponent,
  AddVendorComponent,AdminPackageComponent,AdminAddPackageComponent,
  AdminEditPackageComponent,AdminEditVendorComponent,AdminOrdersComponent
} from './components/index';

//installed modules
import { ModalModule } from 'ng2-bootstrap';
import { AgmCoreModule } from "angular2-google-maps/core";

import { AuthGuard, NotAuthGuard,AuthAdminGuard } from './guards/index';
import {
  CommunityServices, UserServices, AuthenticationService,
  StripeServices, GooglePlaceService, PackageServices,
  AlertService,VendorServices
} from './services/index';

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
    AppComponent,ServicesComponent,TopnavComponent,
    TopnavOneComponent,footerSectionComponent,LandingComponent,
    LandingOneComponent,LoginComponent,SignupComponent,
    PackagesComponent,PackagessectionComponent,UserprofileComponent,
    DashboardComponent,TokenComponent,StripesComponent,
    EditprofileComponent,OrdersComponent,PackagePurchaseComponent,
    AlertComponent,AdminLoginComponent,AdminDashboardComponent,
    AdminTopnavComponent,VendorComponent,AddVendorComponent,
    AdminPackageComponent,AdminAddPackageComponent,AdminEditPackageComponent,
    AdminEditVendorComponent,AdminOrdersComponent

  ],
  providers: [
    AuthGuard,NotAuthGuard,CommunityServices,
    UserServices,AuthenticationService,StripeServices,
    GooglePlaceService,PackageServices,AlertService,
    AuthAdminGuard,VendorServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }