import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { TopnavComponent } from './topNav/topnav.component';
import { LandingComponent } from './landingPage/landing.component';
import { footerSectionComponent } from './footer-section/footer-section.component';
import { PARTIES_DECLARATIONS } from './parties';
import { routes } from './app.routes';
@NgModule({
    imports: [
        BrowserModule,
    	FormsModule,
    	ReactiveFormsModule,
    	RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...PARTIES_DECLARATIONS,
    TopnavComponent,
    footerSectionComponent,
    LandingComponent
  ],

  bootstrap: [
    AppComponent
  ]
})

export class AppModule {}