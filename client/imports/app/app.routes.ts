import { Route } from '@angular/router';
import { TopnavComponent } from './topNav/topnav.component';
import { LandingComponent } from './landingPage/landing.component';
import { LoginComponent } from './login/login.component';

export const routes: Route[] = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'facebook', component: TopnavComponent }
];