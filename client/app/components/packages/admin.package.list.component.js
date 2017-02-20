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
var AdminPackageListComponent = (function () {
    //constructor start
    function AdminPackageListComponent(router, packageService, alertService) {
        this.router = router;
        this.packageService = packageService;
        this.alertService = alertService;
        this.availablePackages = [];
        this.pagetitle = "Package List";
    }
    //end of constructor
    //get packages
    AdminPackageListComponent.prototype.getAllPackage = function () {
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
    AdminPackageListComponent.prototype.deletePackage = function (packageId) {
        var _this = this;
        var con = confirm("Are you sure!, You want to delete this package");
        if (con) {
            this.packageService.deletePackageByid(packageId)
                .subscribe(function (data) {
                if (data.status == 'success') {
                    _this.alertService.success(data.msg, 'packageAlert');
                    _this.getAllPackage();
                }
                else {
                    _this.alertService.error(data.msg, 'packageAlert');
                }
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                _this.alertService.error(errr.msg, 'packageAlert');
            });
        }
    };
    AdminPackageListComponent.prototype.ngAfterViewInit = function () {
        this.getAllPackage();
    };
    AdminPackageListComponent.prototype.ngOnInit = function () {
    };
    AdminPackageListComponent.prototype.ngOnDestroy = function () {
    };
    AdminPackageListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-package-list',
            templateUrl: './admin.package.list.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices, index_1.AlertService])
    ], AdminPackageListComponent);
    return AdminPackageListComponent;
}());
exports.AdminPackageListComponent = AdminPackageListComponent;
//# sourceMappingURL=admin.package.list.component.js.map