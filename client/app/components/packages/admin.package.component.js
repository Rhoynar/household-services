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
var AdminPackageComponent = (function () {
    //constructor start
    function AdminPackageComponent(router, packageService, alertService) {
        this.router = router;
        this.packageService = packageService;
        this.alertService = alertService;
        this.loggedIn = false;
    }
    //end of constructor
    //get packages
    AdminPackageComponent.prototype.getAllPackage = function () {
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
    AdminPackageComponent.prototype.deletePackage = function (packageId) {
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
    AdminPackageComponent.prototype.ngAfterViewInit = function () {
        this.getAllPackage();
    };
    AdminPackageComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
    };
    AdminPackageComponent.prototype.ngOnDestroy = function () {
    };
    AdminPackageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-packages',
            templateUrl: './admin.package.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices, index_1.AlertService])
    ], AdminPackageComponent);
    return AdminPackageComponent;
}());
exports.AdminPackageComponent = AdminPackageComponent;
//# sourceMappingURL=admin.package.component.js.map