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
var AdminOrdersComponent = (function () {
    function AdminOrdersComponent(router, packageService) {
        this.router = router;
        this.packageService = packageService;
        this.allOrders = [];
        this.getAllOrders();
    }
    AdminOrdersComponent.prototype.getAllOrders = function () {
        var _this = this;
        this.packageService.getAllAdminPackageOrders()
            .subscribe(function (data) {
            _this.allOrders = data.result;
        }, function (error) {
            //console.log(error);
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminOrdersComponent.prototype.ngAfterViewInit = function () {
    };
    AdminOrdersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'orders',
            templateUrl: './admin.orders.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices])
    ], AdminOrdersComponent);
    return AdminOrdersComponent;
}());
exports.AdminOrdersComponent = AdminOrdersComponent;
//# sourceMappingURL=admin.orders.component.js.map