import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routes';
import {
  TopnavComponent, LandingComponent, LoginComponent,
  SignupComponent, DashboardComponent, PackagesComponent,
  UserprofileComponent, TokenComponent, PackagessectionComponent,
  footerSectionComponent, EditprofileComponent,StripesComponent
} from './components/index';



import { AuthGuard, NotAuthGuard } from './guards/index';
import { CommunityServices,UserServices, AuthenticationService,StripeServices } from './services/index';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    TopnavComponent,
    footerSectionComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    PackagesComponent,
    PackagessectionComponent,
    UserprofileComponent,
    DashboardComponent,
    TokenComponent,
    StripesComponent,
    EditprofileComponent
  ],
  providers: [AuthGuard, NotAuthGuard,CommunityServices, UserServices, AuthenticationService,StripeServices],
  bootstrap: [AppComponent]
})
export class AppModule { }