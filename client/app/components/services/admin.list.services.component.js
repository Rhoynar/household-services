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
var AdminListServiceComponent = (function () {
    //constructor start
    function AdminListServiceComponent(router, serviceServices, alertService) {
        this.router = router;
        this.serviceServices = serviceServices;
        this.alertService = alertService;
        this.loggedIn = false;
        this.pagetitle = "Service List";
    }
    //end of constructor
    //get vendors
    AdminListServiceComponent.prototype.getAllService = function () {
        var _this = this;
        this.serviceServices.getAllService()
            .subscribe(function (data) {
            _this.serviceList = data.result;
        }, function (error) {
            if (error.status == '401') {
                _this.router.navigate(['/admin']);
            }
        });
    };
    AdminListServiceComponent.prototype.deleteService = function (serviceId) {
        var _this = this;
        var con = confirm("Are you sure!, You want to delete this Service");
        if (con) {
            this.serviceServices.deleteService(serviceId)
                .subscribe(function (data) {
                if (data.status == 'success') {
                    _this.alertService.success(data.msg, 'serviceAlert');
                    _this.getAllService();
                }
                else {
                    _this.alertService.error(data.msg, 'serviceAlert');
                }
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                _this.alertService.error(errr.msg, 'serviceAlert');
                if (error.status == '401') {
                    _this.router.navigate(['/admin']);
                }
            });
        }
    };
    AdminListServiceComponent.prototype.ngAfterViewInit = function () {
        this.getAllService();
    };
    AdminListServiceComponent.prototype.ngOnInit = function () {
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr && currentUser.token.role == "admin") {
            // logged in so return true
            this.loggedIn = true;
        }
        else {
            this.router.navigate(['/']);
        }
    };
    AdminListServiceComponent.prototype.ngOnDestroy = function () {
    };
    AdminListServiceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-list-services',
            templateUrl: './admin.list.services.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.ServiceServices, index_1.AlertService])
    ], AdminListServiceComponent);
    return AdminListServiceComponent;
}());
exports.AdminListServiceComponent = AdminListServiceComponent;
//# sourceMappingURL=admin.list.services.component.js.map