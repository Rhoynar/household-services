import { Route } from '@angular/router';
import { TopnavComponent } from './topNav/topnav.component';
import { LandingComponent } from './landingPage/landing.component';
 
export const routes: Route[] = [
  { path: '', component: LandingComponent },
  { path: 'facebook', component: TopnavComponent }
];