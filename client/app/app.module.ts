import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent }  from './app.component';
import { routing } from './app.routes';
import { TopnavComponent,LandingComponent,LoginComponent,
  SignupComponent,DashboardComponent,PackagesComponent,
  UserprofileComponent,TokenComponent,PackagessectionComponent,footerSectionComponent,EditprofileComponent } from './components/index';


import { AuthGuard,NotAuthGuard } from './guards/index';
import { UserServices,AuthenticationService } from './services/index';

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
        DashboardComponent ,
        TokenComponent,
        EditprofileComponent
        ],
providers:[AuthGuard,NotAuthGuard,UserServices,AuthenticationService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }