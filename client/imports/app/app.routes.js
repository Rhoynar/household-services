"use strict";
var topnav_component_1 = require('./topNav/topnav.component');
var landing_component_1 = require('./landingPage/landing.component');
var login_component_1 = require('./login/login.component');
exports.routes = [
    { path: '', component: landing_component_1.LandingComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'facebook', component: topnav_component_1.TopnavComponent }
];
//# sourceMappingURL=app.routes.js.map