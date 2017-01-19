import { Routes, RouterModule } from '@angular/router';
import {
  TopnavComponent, LandingComponent, LoginComponent,
  SignupComponent, DashboardComponent, PackagesComponent,
  UserprofileComponent, TokenComponent, EditprofileComponent, StripesComponent
} from './components/index';

import { AuthGuard, NotAuthGuard } from './guards/index';

const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard] },
  { path: 'createtoken', component: TokenComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'facebook', component: TopnavComponent },
  { path: 'stripes', component: StripesComponent, canActivate: [AuthGuard] },
  { path: 'packages', component: PackagesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserprofileComponent, canActivate: [AuthGuard] },
  { path: 'services', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'editprofile', component: EditprofileComponent, canActivate: [AuthGuard] }

];

export const routing = RouterModule.forRoot(APP_ROUTES);