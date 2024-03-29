import { Routes, RouterModule } from '@angular/router';
import {
  TopnavComponent, LandingComponent, LoginComponent,
  SignupComponent, DashboardComponent, PackagesComponent,
  UserprofileComponent, TokenComponent, EditprofileComponent, 
  StripesComponent,ServicesComponent,OrdersComponent,
  LandingOneComponent,PackagePurchaseComponent,AdminLoginComponent,
  AdminDashboardComponent,VendorComponent,AddVendorComponent,
  AdminPackageComponent,AdminAddPackageComponent,AdminEditPackageComponent,
  AdminEditVendorComponent,AdminOrdersComponent

} from './components/index';

import { AuthGuard, NotAuthGuard,AuthAdminGuard } from './guards/index';

const APP_ROUTES: Routes = [
  
  { path: '', component: LandingOneComponent },
  { path: 'dash', component: LandingComponent, canActivate: [NotAuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NotAuthGuard] },
  { path: 'createtoken', component: TokenComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'facebook', component: TopnavComponent },
  { path: 'stripes', component: StripesComponent, canActivate: [AuthGuard] },
  { path: 'packages', component: PackagesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: UserprofileComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'package/purchase/:id', component: PackagePurchaseComponent, canActivate: [AuthGuard] },
  { path: 'services', component: ServicesComponent },
 // { path: 'buyservice:id', component: ServicesComponent, canActivate: [AuthGuard] },
  { path: 'editprofile', component: EditprofileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminLoginComponent, canActivate: [NotAuthGuard] },
  { path: 'admin/login', component: AdminLoginComponent, canActivate: [NotAuthGuard] },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/vendors', component: VendorComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/vendor/new', component: AddVendorComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/packages',component: AdminPackageComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/package/new', component: AdminAddPackageComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/package/edit/:id', component: AdminEditPackageComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/vendor/edit/:id', component: AdminEditVendorComponent, canActivate: [AuthAdminGuard] },
  { path: 'admin/orders',component: AdminOrdersComponent, canActivate: [AuthAdminGuard] },
  { path: '**', component: LandingComponent, canActivate: [NotAuthGuard] }

];

export const routing = RouterModule.forRoot(APP_ROUTES);