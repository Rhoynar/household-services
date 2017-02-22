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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var index_1 = require('../../services/index');
var custom_validator_1 = require('../../validators/custom.validator');
var VendorSignupComponent = (function () {
    function VendorSignupComponent(http, fb, route, router, UserServices, serviceServices, alertService) {
        this.http = http;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.UserServices = UserServices;
        this.serviceServices = serviceServices;
        this.alertService = alertService;
        this.pagetitle = "Register Vendor";
        this.loading = false;
        this.error = '';
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.createForm();
        this.getServiceAllType();
    }
    VendorSignupComponent.prototype.getServiceAllType = function () {
        var _this = this;
        this.serviceServices.getAllService()
            .subscribe(function (data) {
            if (data.status == "success") {
                _this.serviceData = data.result;
                for (var _i = 0, _a = data.result; _i < _a.length; _i++) {
                    var s = _a[_i];
                    //this.serviceData[s._id]=false;
                    _this.addService(false);
                }
            }
            else {
                alert(data.msg);
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
            _this.alertService.error(errr.msg, 'package-error');
        });
    };
    VendorSignupComponent.prototype.createForm = function () {
        this.vendorSignupForm = this.fb.group({
            username: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
            useremail: ['', forms_1.Validators.compose([this.customValidator.validEmail, forms_1.Validators.required]), forms_1.Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
            userpass: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])],
            serviceList: this.fb.array([]),
        });
    };
    VendorSignupComponent.prototype.ngOnInit = function () {
    };
    VendorSignupComponent.prototype.initService = function (checked) {
        return this.fb.group({
            service: [checked, forms_1.Validators.required]
        });
    };
    VendorSignupComponent.prototype.addService = function (serviceId) {
        var control = this.vendorSignupForm.controls['serviceList'];
        control.push(this.initService(serviceId));
    };
    VendorSignupComponent.prototype.registerVendor = function () {
        var _this = this;
        var checkedServices = [];
        var serviceListControls = this.vendorSignupForm.controls['serviceList'];
        for (var db in this.vendorSignupForm.controls['serviceList']['controls']) {
            if (this.vendorSignupForm.controls['serviceList']['controls'][db].value.service == true) {
                checkedServices.push(this.serviceData[db]._id);
            }
        }
        this.vendorSignupForm.value.serviceList = checkedServices;
        this.UserServices.registerVendor(this.vendorSignupForm.value)
            .subscribe(function (data) {
            _this.alertService.success(data.msg, 'login');
            _this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            _this.alertService.error(errr.msg, 'signup');
        });
    };
    VendorSignupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'vendor-signup',
            templateUrl: './vendor.signup.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, index_1.UserServices, index_1.ServiceServices, index_1.AlertService])
    ], VendorSignupComponent);
    return VendorSignupComponent;
}());
exports.VendorSignupComponent = VendorSignupComponent;
//# sourceMappingURL=vendor.signup.component.js.map