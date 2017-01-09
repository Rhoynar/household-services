"use strict";
var router_1 = require('@angular/router');
var topnav_component_1 = require('./components/topNav/topnav.component');
var landing_component_1 = require('./components/landingPage/landing.component');
var login_component_1 = require('./components/login/login.component');
var signup_component_1 = require('./components/signup/signup.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var packages_component_1 = require('./components/packages/packages.component');
var userprofiles_component_1 = require('./components/userprofile/userprofiles.component');
var auth_services_1 = require('./services/auth.services');
var APP_ROUTES = [
    { path: '', component: landing_component_1.LandingComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_services_1.AuthGuard] },
    { path: 'facebook', component: topnav_component_1.TopnavComponent },
    { path: 'packages', component: packages_component_1.PackagesComponent, canActivate: [auth_services_1.AuthGuard] },
    { path: 'profile', component: userprofiles_component_1.UserprofileComponent, canActivate: [auth_services_1.AuthGuard] }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map