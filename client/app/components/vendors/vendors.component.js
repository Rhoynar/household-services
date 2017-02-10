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
var VendorComponent = (function () {
    //constructor start
    function VendorComponent(router, vendorsService, alertService) {
        this.router = router;
        this.vendorsService = vendorsService;
        this.alertService = alertService;
        this.loggedIn = false;
    }
    //end of constructor
    //get vendors
    VendorComponent.prototype.getAllVendors = function () {
        var _this = this;
        this.vendorsService.getAllVendors()
            .subscribe(function (data) {
            _this.availableVendors = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    VendorComponent.prototype.deleteVendor = function (vendorId) {
        var _this = this;
        var con = confirm("Are you sure!, You want to delete this vendor");
        if (con) {
            this.vendorsService.deleteVendorByid(vendorId)
                .subscribe(function (data) {
                if (data.status == 'success') {
                    _this.alertService.success(data.msg, 'vendorAlert');
                    _this.getAllVendors();
                }
                else {
                    _this.alertService.error(data.msg, 'vendorAlert');
                }
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                _this.alertService.error(errr.msg, 'vendorAlert');
            });
        }
    };
    VendorComponent.prototype.ngAfterViewInit = function () {
        this.getAllVendors();
    };
    VendorComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
    };
    VendorComponent.prototype.ngOnDestroy = function () {
    };
    VendorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'vendors',
            templateUrl: './vendors.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.VendorServices, index_1.AlertService])
    ], VendorComponent);
    return VendorComponent;
}());
exports.VendorComponent = VendorComponent;
//# sourceMappingURL=vendors.component.js.map