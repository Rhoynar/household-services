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
var AdminOrderListComponent = (function () {
    function AdminOrderListComponent(alertService, orderServices, router) {
        this.alertService = alertService;
        this.orderServices = orderServices;
        this.router = router;
        this.orderList = [];
        this.pagetitle = 'Orders';
        this.getAllOrder();
    }
    //get packages
    AdminOrderListComponent.prototype.getAllOrder = function () {
        var _this = this;
        this.orderServices.getAllOrder()
            .subscribe(function (data) {
            _this.orderList = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminOrderListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-order-list',
            templateUrl: './admin.order.list.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.AlertService, index_1.OrderServices, router_1.Router])
    ], AdminOrderListComponent);
    return AdminOrderListComponent;
}());
exports.AdminOrderListComponent = AdminOrderListComponent;
//# sourceMappingURL=admin.order.list.component.js.map