"use strict";
var router_1 = require('@angular/router');
var index_1 = require('./components/index');
var APP_ROUTES = [
    { path: '', component: index_1.GuestHomeComponent },
    { path: 'login', component: index_1.UserLoginComponent },
    { path: '**', component: index_1.GuestHomeComponent }
];
exports.routing = router_1.RouterModule.forRoot(APP_ROUTES);
//# sourceMappingURL=app.routes.js.map