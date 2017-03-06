"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./components/index');
var index_2 = require('./guards/index');
var APP_ROUTES = [
    { path: '', component: index_1.GuestHomeComponent, canActivate: [index_2.GuestGuard] },
    { path: 'login', component: index_1.UserLoginComponent, canActivate: [index_2.GuestGuard] },
    { path: 'createtoken', component: index_1.TokenComponent },
    { path: 'learnmore', component: index_1.LearnMoreComponent },
    { path: 'forgotpass', component: index_1.ForgotPassComponent, canActivate: [index_2.GuestGuard] },
    { path: 'resetpass/:id', component: index_1.ResetPassComponent, canActivate: [index_2.GuestGuard] },
    { path: 'confirmsignup/:type', component: index_1.ConfirmSignupComponent, canActivate: [index_2.GuestGuard] },
    { path: 'services', component: index_1.UserListServicesComponent },
    { path: 'signup', component: index_1.UserSignupComponent, canActivate: [index_2.GuestGuard] },
    { path: 'dashboard', component: index_1.UserDashboardComponent, canActivate: [index_2.UserLoginGuard] },
    { path: 'profile', component: index_1.UserProfileComponent, canActivate: [index_2.UserLoginGuard] },
    { path: 'updateprofile', component: index_1.EditUserProfileComponent, canActivate: [index_2.UserLoginGuard] },
    { path: 'package/search', component: index_1.UserPackageSearchComponent, canActivate: [index_2.UserLoginGuard] },
    { path: 'package', component: index_1.UserPackageListComponent, canActivate: [index_2.UserLoginGuard] },
    { path: 'order', component: index_1.UserOrderListComponent, canActivate: [index_2.UserLoginGuard] },
    { path: 'admin', component: index_1.AdminDashboardComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/dashboard', component: index_1.AdminDashboardComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/vendors', component: index_1.ListVendorComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/waitingvendors', component: index_1.ListPendingVendorComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/packages', component: index_1.AdminPackageListComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/package/new', component: index_1.AdminAddPackageComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/package/edit/:id', component: index_1.AdminEditPackageComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/community/new', component: index_1.AdminAddCommunityComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/community', component: index_1.AdminCommunityListComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/services', component: index_1.AdminListServiceComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/services/new', component: index_1.AdminAddServiceComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/services/:id', component: index_1.AdminEditServiceComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/orders', component: index_1.AdminOrderListComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'vendor/signup', component: index_1.VendorSignupComponent, canActivate: [index_2.GuestGuard] },
    { path: 'vendor', component: index_1.VendorDashboardComponent, canActivate: [index_2.VendorLoginGuard] },
    { path: 'vendor/dashboard', component: index_1.VendorDashboardComponent, canActivate: [index_2.VendorLoginGuard] },
    { path: 'vendor/orders', component: index_1.VendorOrderListComponent, canActivate: [index_2.VendorLoginGuard] },
    { path: 'vendor/packages', component: index_1.VendorPackageListComponent, canActivate: [index_2.VendorLoginGuard] },
    { path: '**', component: index_1.GuestHomeComponent, canActivate: [index_2.GuestGuard] },
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map