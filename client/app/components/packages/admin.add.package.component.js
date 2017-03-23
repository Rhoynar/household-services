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
var AdminAddPackageComponent = (function () {
    //constructor start
    function AdminAddPackageComponent(http, fb, router, packageServices, userServices, serviceServices, communityServices) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.packageServices = packageServices;
        this.userServices = userServices;
        this.serviceServices = serviceServices;
        this.communityServices = communityServices;
        this.loggedIn = false;
        this.availableServices = [];
        this.availableCommunity = [];
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.pagetitle = "New Package";
        this.addPackageForm = this.fb.group({
            title: ['', forms_1.Validators.required],
            //serviceId: ['', Validators.required],
            //communityId: ['', Validators.required],
            //postcode: ['', Validators.required],
            //price: ['', Validators.required],
            mon_mor_price: [0, forms_1.Validators.required],
            mon_noon_price: [0, forms_1.Validators.required],
            mon_eve_price: [0, forms_1.Validators.required],
            tue_mor_price: [0, forms_1.Validators.required],
            tue_noon_price: [0, forms_1.Validators.required],
            tue_eve_price: [0, forms_1.Validators.required],
            wed_mor_price: [0, forms_1.Validators.required],
            wed_noon_price: [0, forms_1.Validators.required],
            wed_eve_price: [0, forms_1.Validators.required],
            thur_mor_price: [0, forms_1.Validators.required],
            thur_noon_price: [0, forms_1.Validators.required],
            thur_eve_price: [0, forms_1.Validators.required],
            fri_mor_price: [0, forms_1.Validators.required],
            fri_noon_price: [0, forms_1.Validators.required],
            fri_eve_price: [0, forms_1.Validators.required],
            sat_mor_price: [0, forms_1.Validators.required],
            sat_noon_price: [0, forms_1.Validators.required],
            sat_eve_price: [0, forms_1.Validators.required],
            sun_mor_price: [0, forms_1.Validators.required],
            sun_noon_price: [0, forms_1.Validators.required],
            sun_eve_price: [0, forms_1.Validators.required],
            frequency: [0, forms_1.Validators.required],
            vendorList: this.fb.array([this.initVendor()]),
            featureList: this.fb.array([this.initFeature()])
        });
    }
    //end of constructor
    AdminAddPackageComponent.prototype.initFeature = function () {
        return this.fb.group({
            feature: ['', forms_1.Validators.required]
        });
    };
    AdminAddPackageComponent.prototype.initVendor = function () {
        return this.fb.group({
            vendor: ['', forms_1.Validators.required]
        });
    };
    AdminAddPackageComponent.prototype.addFeature = function () {
        var control = this.addPackageForm.controls['featureList'];
        control.push(this.initFeature());
    };
    AdminAddPackageComponent.prototype.addVendor = function () {
        var control = this.addPackageForm.controls['vendorList'];
        control.push(this.initVendor());
    };
    //get vendors
    AdminAddPackageComponent.prototype.packagePage = function () {
        this.router.navigate(['/admin/packages']);
    };
    AdminAddPackageComponent.prototype.removefeature = function (index) {
        var arrayControl = this.addPackageForm.controls['featureList'];
        arrayControl.removeAt(index);
    };
    AdminAddPackageComponent.prototype.removeVendor = function (index) {
        var arrayControl = this.addPackageForm.controls['vendorList'];
        arrayControl.removeAt(index);
    };
    AdminAddPackageComponent.prototype.submitForm = function () {
        var _this = this;
        this.packageServices.addPackage(this.addPackageForm.value)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
                _this.packagePage();
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
    AdminAddPackageComponent.prototype.ngAfterViewInit = function () {
        this.getActiveVendors();
        this.getAllServices();
        this.getAllCommunities();
    };
    AdminAddPackageComponent.prototype.getAllCommunities = function () {
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
    AdminAddPackageComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
    };
    //get vendors
    AdminAddPackageComponent.prototype.getActiveVendors = function () {
        var _this = this;
        //this.userServices.getUserByRole('vendor')
        this.userServices.getVendorByStatus(1)
            .subscribe(function (data) {
            _this.availableVendors = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    //get services
    AdminAddPackageComponent.prototype.getAllServices = function () {
        var _this = this;
        this.serviceServices.getAllService()
            .subscribe(function (data) {
            _this.availableServices = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminAddPackageComponent.prototype.ngOnDestroy = function () {
    };
    AdminAddPackageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-add-package',
            templateUrl: './admin.add.package.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, index_1.PackageServices, index_1.UserServices, index_1.ServiceServices, index_1.CommunityServices])
    ], AdminAddPackageComponent);
    return AdminAddPackageComponent;
}());
exports.AdminAddPackageComponent = AdminAddPackageComponent;
//# sourceMappingURL=admin.add.package.component.js.map