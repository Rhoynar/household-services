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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var index_1 = require('../../services/index');
var http_1 = require('@angular/http');
var custom_validator_1 = require('../../validators/custom.validator');
var AdminAddServiceComponent = (function () {
    //constructor start
    function AdminAddServiceComponent(http, fb, router, serviceServices, communityServices) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.serviceServices = serviceServices;
        this.communityServices = communityServices;
        this.loggedIn = false;
        this.availableCommunity = [];
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.pagetitle = "New Service";
        this.addServiceForm = this.fb.group({
            title: ['', forms_1.Validators.required],
            communityId: ['', forms_1.Validators.required],
        });
        console.log(this.addServiceForm);
    }
    //end of constructor
    //service page
    AdminAddServiceComponent.prototype.servicePage = function () {
        this.router.navigate(['/admin/services']);
    };
    AdminAddServiceComponent.prototype.submitForm = function () {
        var _this = this;
        console.log(this.addServiceForm.value);
        this.serviceServices.addService(this.addServiceForm.value)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
                _this.servicePage();
            }
            //this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminAddServiceComponent.prototype.getAllCommunities = function () {
        var _this = this;
        this.communityServices.getAllCommunity()
            .subscribe(function (data) {
            _this.availableCommunity = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminAddServiceComponent.prototype.ngAfterViewInit = function () {
        this.getAllCommunities();
    };
    AdminAddServiceComponent.prototype.ngOnInit = function () {
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
    AdminAddServiceComponent.prototype.ngOnDestroy = function () {
    };
    AdminAddServiceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-add-service',
            templateUrl: './admin.add.services.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, index_1.ServiceServices, index_1.CommunityServices])
    ], AdminAddServiceComponent);
    return AdminAddServiceComponent;
}());
exports.AdminAddServiceComponent = AdminAddServiceComponent;
//# sourceMappingURL=admin.add.services.component.js.map