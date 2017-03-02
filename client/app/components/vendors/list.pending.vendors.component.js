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
var ListPendingVendorComponent = (function () {
    //constructor start
    function ListPendingVendorComponent(router, userServices, alertService) {
        this.router = router;
        this.userServices = userServices;
        this.alertService = alertService;
        this.loggedIn = false;
        this.pagetitle = "Pending Vendor List";
    }
    //end of constructor
    //get vendors
    ListPendingVendorComponent.prototype.getPendingVendors = function () {
        var _this = this;
        //this.userServices.getUserByRole('vendor')
        this.userServices.getVendorByStatus(0)
            .subscribe(function (data) {
            _this.availableVendors = data.result;
        }, function (error) {
            if (error.status == '401') {
                _this.router.navigate(['/admin']);
            }
        });
    };
    ListPendingVendorComponent.prototype.approveVendor = function (vendorId) {
        var _this = this;
        var con = confirm("Are you sure!, You want to approve this vendor");
        if (con) {
            this.userServices.approveVendor({ vendorId: vendorId })
                .subscribe(function (data) {
                if (data.status == 'success') {
                    _this.alertService.success(data.msg, 'vendorAlert');
                    _this.getPendingVendors();
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
    ListPendingVendorComponent.prototype.deleteVendor = function (vendorId) {
        var _this = this;
        var con = confirm("Are you sure!, You want to delete this vendor");
        if (con) {
            this.userServices.deleteUser(vendorId)
                .subscribe(function (data) {
                if (data.status == 'success') {
                    _this.alertService.success(data.msg, 'vendorAlert');
                    _this.getPendingVendors();
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
    ListPendingVendorComponent.prototype.ngAfterViewInit = function () {
        this.getPendingVendors();
    };
    ListPendingVendorComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
    };
    ListPendingVendorComponent.prototype.ngOnDestroy = function () {
    };
    ListPendingVendorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'list-pending-vendors',
            templateUrl: './list.pending.vendors.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.UserServices, index_1.AlertService])
    ], ListPendingVendorComponent);
    return ListPendingVendorComponent;
}());
exports.ListPendingVendorComponent = ListPendingVendorComponent;
//# sourceMappingURL=list.pending.vendors.component.js.map