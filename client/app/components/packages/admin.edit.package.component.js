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
var AdminEditPackageComponent = (function () {
    //constructor start
    function AdminEditPackageComponent(http, router, fb, alertService, activatedRoute, userServices, packageServices, serviceServices, communityServices) {
        this.http = http;
        this.router = router;
        this.fb = fb;
        this.alertService = alertService;
        this.activatedRoute = activatedRoute;
        this.userServices = userServices;
        this.packageServices = packageServices;
        this.serviceServices = serviceServices;
        this.communityServices = communityServices;
        this.loggedIn = false;
        this.packageId = '';
        this.availableServices = [];
        this.availableCommunity = [];
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.packageDetails = {};
        this.pagetitle = "Update Package";
        var params = this.activatedRoute.snapshot.params;
        this.packageId = params.id;
        this.editPackageForm = this.fb.group({
            id: ['', forms_1.Validators.required],
            //serviceId: ['', Validators.required],
            communityId: ['', forms_1.Validators.required],
            title: ['', forms_1.Validators.required],
            postcode: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
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
            frequency: ['', forms_1.Validators.required],
            vendorList: this.fb.array([]),
            featureList: this.fb.array([])
        });
    }
    //end of constructor
    AdminEditPackageComponent.prototype.initFeature = function () {
        return this.fb.group({
            feature: ['', forms_1.Validators.required]
        });
    };
    AdminEditPackageComponent.prototype.initVendor = function () {
        return this.fb.group({
            vendor: ['', forms_1.Validators.required]
        });
    };
    AdminEditPackageComponent.prototype.addFeature = function () {
        var control = this.editPackageForm.controls['featureList'];
        control.push(this.initFeature());
    };
    AdminEditPackageComponent.prototype.addVendor = function () {
        var control = this.editPackageForm.controls['vendorList'];
        control.push(this.initVendor());
    };
    //get vendors
    AdminEditPackageComponent.prototype.packagePage = function () {
        this.router.navigate(['/admin/packages']);
    };
    AdminEditPackageComponent.prototype.removefeature = function (index) {
        var arrayControl = this.editPackageForm.controls['featureList'];
        arrayControl.removeAt(index);
    };
    AdminEditPackageComponent.prototype.removeVendor = function (index) {
        var arrayControl = this.editPackageForm.controls['vendorList'];
        arrayControl.removeAt(index);
    };
    AdminEditPackageComponent.prototype.submitForm = function () {
        //console.log('Reactive Form Data: ')
        //console.log(this.editPackageForm.value);
        var _this = this;
        this.packageServices.updatePackage(this.editPackageForm.value)
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
    AdminEditPackageComponent.prototype.ngAfterViewInit = function () {
    };
    AdminEditPackageComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
        this.packageServices.getPackageByid(this.packageId)
            .subscribe(function (data) {
            if (data.status == "success") {
                _this.packageDetails = data.result;
                _this.editPackageForm.controls['id'].setValue(_this.packageDetails._id);
                _this.editPackageForm.controls['title'].setValue(_this.packageDetails.title);
                _this.editPackageForm.controls['communityId'].setValue(_this.packageDetails.communityId);
                //this.editPackageForm.controls['serviceId'].setValue(this.packageDetails.serviceId._id);
                _this.editPackageForm.controls['postcode'].setValue(_this.packageDetails.postalcode);
                _this.editPackageForm.controls['price'].setValue(_this.packageDetails.price);
                _this.editPackageForm.controls['frequency'].setValue(_this.packageDetails.frequency);
                _this.editPackageForm.controls['mon_mor_price'].setValue(_this.packageDetails.mon_mor_price);
                _this.editPackageForm.controls['mon_noon_price'].setValue(_this.packageDetails.mon_noon_price);
                _this.editPackageForm.controls['mon_eve_price'].setValue(_this.packageDetails.mon_eve_price);
                _this.editPackageForm.controls['tue_mor_price'].setValue(_this.packageDetails.tue_mor_price);
                _this.editPackageForm.controls['tue_noon_price'].setValue(_this.packageDetails.tue_noon_price);
                _this.editPackageForm.controls['tue_eve_price'].setValue(_this.packageDetails.tue_eve_price);
                _this.editPackageForm.controls['wed_mor_price'].setValue(_this.packageDetails.wed_mor_price);
                _this.editPackageForm.controls['wed_noon_price'].setValue(_this.packageDetails.wed_noon_price);
                _this.editPackageForm.controls['wed_eve_price'].setValue(_this.packageDetails.wed_eve_price);
                _this.editPackageForm.controls['thur_mor_price'].setValue(_this.packageDetails.thur_mor_price);
                _this.editPackageForm.controls['thur_noon_price'].setValue(_this.packageDetails.thur_noon_price);
                _this.editPackageForm.controls['thur_eve_price'].setValue(_this.packageDetails.thur_eve_price);
                _this.editPackageForm.controls['fri_mor_price'].setValue(_this.packageDetails.fri_mor_price);
                _this.editPackageForm.controls['fri_noon_price'].setValue(_this.packageDetails.fri_noon_price);
                _this.editPackageForm.controls['fri_eve_price'].setValue(_this.packageDetails.fri_eve_price);
                _this.editPackageForm.controls['sat_mor_price'].setValue(_this.packageDetails.sat_mor_price);
                _this.editPackageForm.controls['sat_noon_price'].setValue(_this.packageDetails.sat_noon_price);
                _this.editPackageForm.controls['sat_eve_price'].setValue(_this.packageDetails.sat_eve_price);
                _this.editPackageForm.controls['sun_mor_price'].setValue(_this.packageDetails.sun_mor_price);
                _this.editPackageForm.controls['sun_noon_price'].setValue(_this.packageDetails.sun_noon_price);
                _this.editPackageForm.controls['sun_eve_price'].setValue(_this.packageDetails.sun_eve_price);
                var control = _this.editPackageForm.controls['featureList'];
                for (var _i = 0, _a = _this.packageDetails.features; _i < _a.length; _i++) {
                    var eachFeature = _a[_i];
                    var newControl = _this.initFeature();
                    control.push(newControl);
                    newControl.controls['feature'].setValue(eachFeature);
                }
                var vendorControl = _this.editPackageForm.controls['vendorList'];
                for (var _b = 0, _c = _this.packageDetails.vendors; _b < _c.length; _b++) {
                    var eachVendor = _c[_b];
                    var newControl = _this.initVendor();
                    vendorControl.push(newControl);
                    newControl.controls['vendor'].setValue(eachVendor);
                }
            }
            else {
                alert(data.msg);
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            //alert(errr.msg);
            _this.alertService.error(errr.msg, 'package-error');
        });
        this.getActiveVendors();
        this.getAllServices();
        this.getAllCommunities();
    };
    AdminEditPackageComponent.prototype.getAllCommunities = function () {
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
    //get vendors
    AdminEditPackageComponent.prototype.getActiveVendors = function () {
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
    AdminEditPackageComponent.prototype.getAllServices = function () {
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
    AdminEditPackageComponent.prototype.ngOnDestroy = function () {
    };
    AdminEditPackageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-edit-package',
            templateUrl: './admin.edit.package.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, forms_1.FormBuilder, index_1.AlertService, router_1.ActivatedRoute, index_1.UserServices, index_1.PackageServices, index_1.ServiceServices, index_1.CommunityServices])
    ], AdminEditPackageComponent);
    return AdminEditPackageComponent;
}());
exports.AdminEditPackageComponent = AdminEditPackageComponent;
//# sourceMappingURL=admin.edit.package.component.js.map