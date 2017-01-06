"use strict";
var topnav_component_1 = require('./components/topNav/topnav.component');
var landing_component_1 = require('./components/landingPage/landing.component');
var login_component_1 = require('./components/login/login.component');
var signup_component_1 = require('./components/signup/signup.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var packages_component_1 = require('./components/packages/packages.component');
var userprofiles_component_1 = require('./components/userprofile/userprofiles.component');
exports.routes = [
    { path: '', component: landing_component_1.LandingComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'facebook', component: topnav_component_1.TopnavComponent },
    { path: 'packages', component: packages_component_1.PackagesComponent },
    { path: 'profile', component: userprofiles_component_1.UserprofileComponent }
];
//# sourceMappingURL=app.routes.js.map