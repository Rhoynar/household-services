import { Routes, RouterModule } from '@angular/router';
import {
  GuestHomeComponent, UserLoginComponent, UserDashboardComponent,
  UserSignupComponent, TokenComponent, UserProfileComponent,
  EditUserProfileComponent, AdminDashboardComponent, VendorSignupComponent,
  VendorDashboardComponent, ListVendorComponent, AdminPackageListComponent,
  AdminAddPackageComponent, AdminEditPackageComponent, UserPackageSearchComponent,
  UserPackageListComponent, UserOrderListComponent, AdminListServiceComponent,
  AdminAddServiceComponent, AdminEditServiceComponent, AdminOrderListComponent,
  VendorOrderListComponent, VendorPackageListComponent, UserListServicesComponent,
  LearnMoreComponent, ConfirmSignupComponent, ForgotPassComponent, ResetPassComponent,
  ListPendingVendorComponent,AdminAddCommunityComponent
} from './components/index';

import {
  UserLoginGuard, GuestGuard,
  AdminLoginGuard, VendorLoginGuard
} from './guards/index';

const APP_ROUTES: Routes = [

  { path: '', component: GuestHomeComponent, canActivate: [GuestGuard] },
  { path: 'login', component: UserLoginComponent, canActivate: [GuestGuard] },
  { path: 'createtoken', component: TokenComponent },
  { path: 'learnmore', component: LearnMoreComponent },
  { path: 'forgotpass', component: ForgotPassComponent, canActivate: [GuestGuard] },
  { path: 'resetpass/:id', component: ResetPassComponent, canActivate: [GuestGuard] },
  { path: 'confirmsignup/:type', component: ConfirmSignupComponent, canActivate: [GuestGuard] },
  { path: 'services', component: UserListServicesComponent },
  { path: 'signup', component: UserSignupComponent, canActivate: [GuestGuard] },
  { path: 'dashboard', component: UserDashboardComponent, canActivate: [UserLoginGuard] },
  { path: 'profile', component: UserProfileComponent, canActivate: [UserLoginGuard] },
  { path: 'updateprofile', component: EditUserProfileComponent, canActivate: [UserLoginGuard] },
  { path: 'package/search', component: UserPackageSearchComponent, canActivate: [UserLoginGuard] },
  { path: 'package', component: UserPackageListComponent, canActivate: [UserLoginGuard] },
  { path: 'order', component: UserOrderListComponent, canActivate: [UserLoginGuard] },


  { path: 'admin', component: AdminDashboardComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/vendors', component: ListVendorComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/waitingvendors', component: ListPendingVendorComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/packages', component: AdminPackageListComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/package/new', component: AdminAddPackageComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/package/edit/:id', component: AdminEditPackageComponent, canActivate: [AdminLoginGuard] },

  { path: 'admin/community/new', component: AdminAddCommunityComponent, canActivate: [AdminLoginGuard] },
  
  { path: 'admin/services', component: AdminListServiceComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/services/new', component: AdminAddServiceComponent, canActivate: [AdminLoginGuard] },
  { path: 'admin/services/:id', component: AdminEditServiceComponent, canActivate: [AdminLoginGuard] },

  { path: 'admin/orders', component: AdminOrderListComponent, canActivate: [AdminLoginGuard] },

  { path: 'vendor/signup', component: VendorSignupComponent, canActivate: [GuestGuard] },
  { path: 'vendor', component: VendorDashboardComponent, canActivate: [VendorLoginGuard] },
  { path: 'vendor/dashboard', component: VendorDashboardComponent, canActivate: [VendorLoginGuard] },
  { path: 'vendor/orders', component: VendorOrderListComponent, canActivate: [VendorLoginGuard] },
  { path: 'vendor/packages', component: VendorPackageListComponent, canActivate: [VendorLoginGuard] },
  { path: '**', component: GuestHomeComponent, canActivate: [GuestGuard] },

];

export const routing = RouterModule.forRoot(APP_ROUTES);