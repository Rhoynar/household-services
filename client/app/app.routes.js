"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./components/index');
var index_2 = require('./guards/index');
var APP_ROUTES = [
    { path: '', component: index_1.GuestHomeComponent, canActivate: [index_2.GuestGuard] },
    { path: 'login', component: index_1.UserLoginComponent, canActivate: [index_2.GuestGuard] },
    { path: 'createtoken', component: index_1.TokenComponent },
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
    { path: 'admin/packages', component: index_1.AdminPackageListComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/package/new', component: index_1.AdminAddPackageComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/package/edit/:id', component: index_1.AdminEditPackageComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'vendor/signup', component: index_1.VendorSignupComponent, canActivate: [index_2.GuestGuard] },
    { path: 'vendor', component: index_1.VendorDashboardComponent, canActivate: [index_2.VendorLoginGuard] },
    { path: 'vendor/dashboard', component: index_1.VendorDashboardComponent, canActivate: [index_2.VendorLoginGuard] },
    { path: '**', component: index_1.GuestHomeComponent, canActivate: [index_2.GuestGuard] },
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map