"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./components/index');
var index_2 = require('./guards/index');
var APP_ROUTES = [
    { path: '', component: index_1.LandingComponent, canActivate: [index_2.NotAuthGuard] },
    { path: 'login', component: index_1.LoginComponent, canActivate: [index_2.NotAuthGuard] },
    { path: 'signup', component: index_1.SignupComponent, canActivate: [index_2.NotAuthGuard] },
    { path: 'createtoken', component: index_1.TokenComponent },
    { path: 'dashboard', component: index_1.DashboardComponent, canActivate: [index_2.AuthGuard] },
    { path: 'facebook', component: index_1.TopnavComponent },
    { path: 'packages', component: index_1.PackagesComponent, canActivate: [index_2.AuthGuard] },
    { path: 'profile', component: index_1.UserprofileComponent, canActivate: [index_2.AuthGuard] }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map