import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import { routing } from './app.routes';
import { TopnavComponent } from './components/topNav/topnav.component';
import { LandingComponent } from './components/landingPage/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { footerSectionComponent } from './components/footer-section/footer-section.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PackagesComponent } from './components/packages/packages.component';
import { PackagessectionComponent } from './components/packages/packages-section.component';
import { UserprofileComponent } from './components/userprofile/userprofiles.component';
import { AuthGuard } from './services/auth.services';
import { UserServices } from './services/users.services';

@NgModule({
  imports:      [  
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
        DashboardComponent 
        ],
providers:[AuthGuard,UserServices],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }