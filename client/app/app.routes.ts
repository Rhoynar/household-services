import { Routes,RouterModule } from '@angular/router';
import { TopnavComponent } from './components/topNav/topnav.component';
import { LandingComponent } from './components/landingPage/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PackagesComponent } from './components/packages/packages.component';
import { UserprofileComponent } from './components/userprofile/userprofiles.component';

const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'facebook', component: TopnavComponent },
  { path: 'packages', component: PackagesComponent },
  { path: 'profile', component: UserprofileComponent }
];

export const routing =RouterModule.forRoot(APP_ROUTES);