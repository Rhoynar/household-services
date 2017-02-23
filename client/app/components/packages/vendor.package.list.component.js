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
var VendorPackageListComponent = (function () {
    //constructor start
    function VendorPackageListComponent(router, packageService, alertService) {
        this.router = router;
        this.packageService = packageService;
        this.alertService = alertService;
        this.availablePackages = [];
        this.pagetitle = "Package List";
    }
    //end of constructor
    //get packages
    VendorPackageListComponent.prototype.getAllPackage = function () {
        var _this = this;
        this.packageService.getAllPackage()
            .subscribe(function (data) {
            _this.availablePackages = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    VendorPackageListComponent.prototype.ngAfterViewInit = function () {
        this.getAllPackage();
    };
    VendorPackageListComponent.prototype.ngOnInit = function () {
    };
    VendorPackageListComponent.prototype.ngOnDestroy = function () {
    };
    VendorPackageListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'vendor-package-list',
            templateUrl: './vendor.package.list.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices, index_1.AlertService])
    ], VendorPackageListComponent);
    return VendorPackageListComponent;
}());
exports.VendorPackageListComponent = VendorPackageListComponent;
//# sourceMappingURL=vendor.package.list.component.js.map