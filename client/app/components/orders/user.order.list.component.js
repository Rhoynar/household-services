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
var UserOrderListComponent = (function () {
    function UserOrderListComponent(alertService, orderServices, router) {
        this.alertService = alertService;
        this.orderServices = orderServices;
        this.router = router;
        this.userOrders = [];
        this.pagetitle = 'Orders';
        this.getUserOrder();
    }
    //get packages
    UserOrderListComponent.prototype.getUserOrder = function () {
        var _this = this;
        this.orderServices.getUserOrder()
            .subscribe(function (data) {
            _this.userOrders = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    UserOrderListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-order',
            templateUrl: './user.order.list.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.AlertService, index_1.OrderServices, router_1.Router])
    ], UserOrderListComponent);
    return UserOrderListComponent;
}());
exports.UserOrderListComponent = UserOrderListComponent;
//# sourceMappingURL=user.order.list.component.js.map