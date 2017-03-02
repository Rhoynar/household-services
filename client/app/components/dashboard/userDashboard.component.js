"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var index_1 = require('../../services/index');
var UserDashboardComponent = (function () {
    function UserDashboardComponent(alertService, orderServices, ngZone, router) {
        this.alertService = alertService;
        this.orderServices = orderServices;
        this.ngZone = ngZone;
        this.router = router;
        this.pagetitle = 'Dashboard';
        this.userOrders = [];
        this.getUserOrder();
    }
    //get packages
    UserDashboardComponent.prototype.getUserOrder = function () {
        var _this = this;
        this.orderServices.getUpcomingUserOrder()
            .subscribe(function (data) {
            _this.userOrders = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    UserDashboardComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-dashboard',
            templateUrl: './userDashboard.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.AlertService, index_1.OrderServices, core_1.NgZone, router_1.Router])
    ], UserDashboardComponent);
    return UserDashboardComponent;
}());
exports.UserDashboardComponent = UserDashboardComponent;
//# sourceMappingURL=userDashboard.component.js.map