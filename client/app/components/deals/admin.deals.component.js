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
var AdminDealsComponent = (function () {
    function AdminDealsComponent(router, packageService) {
        this.router = router;
        this.packageService = packageService;
        this.allDeals = [];
        this.getAllDeals();
    }
    AdminDealsComponent.prototype.getAllDeals = function () {
        var _this = this;
        this.packageService.getAllAdminPackageDeals()
            .subscribe(function (data) {
            _this.allDeals = data.result;
        }, function (error) {
            //console.log(error);
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminDealsComponent.prototype.ngAfterViewInit = function () {
    };
    AdminDealsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'deals',
            templateUrl: './admin.deals.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices])
    ], AdminDealsComponent);
    return AdminDealsComponent;
}());
exports.AdminDealsComponent = AdminDealsComponent;
//# sourceMappingURL=admin.deals.component.js.map