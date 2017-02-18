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
    { path: 'admin', component: index_1.AdminDashboardComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: 'admin/dashboard', component: index_1.AdminDashboardComponent, canActivate: [index_2.AdminLoginGuard] },
    { path: '**', component: index_1.GuestHomeComponent, canActivate: [index_2.GuestGuard] },
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map