import { Routes, RouterModule } from '@angular/router';
import {
  GuestHomeComponent, UserLoginComponent, UserDashboardComponent,
  UserSignupComponent, TokenComponent, UserProfileComponent,
  EditUserProfileComponent,AdminDashboardComponent
} from './components/index';

import {
  UserLoginGuard, GuestGuard,
  AdminLoginGuard, VendorLoginGuard
} from './guards/index';

const APP_ROUTES: Routes = [

  { path: '', component: GuestHomeComponent, canActivate: [GuestGuard] },
  { path: 'login', component: UserLoginComponent, canActivate: [GuestGuard] },
  { path: 'createtoken', component: TokenComponent },
  { path: 'signup', component: UserSignupComponent, canActivate: [GuestGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [UserLoginGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [UserLoginGuard] },
  { path: 'updateprofile', component: EditUserProfileComponent, canActivate: [UserLoginGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminLoginGuard] },
  { path: '**', component: GuestHomeComponent, canActivate: [GuestGuard] },

];

export const routing = RouterModule.forRoot(APP_ROUTES);