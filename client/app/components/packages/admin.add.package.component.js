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
var vendor_model_1 = require('../../models/vendor.model');
var http_1 = require('@angular/http');
var custom_validator_1 = require('../../validators/custom.validator');
var AdminAddPackageComponent = (function () {
    //constructor start
    function AdminAddPackageComponent(http, fb, router, packageServices, vendorsService) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.packageServices = packageServices;
        this.vendorsService = vendorsService;
        this.loggedIn = false;
        this.vendorModel = new vendor_model_1.VendorModel();
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.addPackageForm = this.fb.group({
            title: ['', forms_1.Validators.required],
            postcode: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            frequency: ['', forms_1.Validators.required],
            vendorList: this.fb.array([this.initVendor()]),
            featureList: this.fb.array([this.initFeature()])
        });
        console.log(this.addPackageForm);
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
        console.log(this.addPackageForm.controls['featureList']);
    };
    AdminAddPackageComponent.prototype.addVendor = function () {
        var control = this.addPackageForm.controls['vendorList'];
        control.push(this.initVendor());
    };
    //get vendors
    AdminAddPackageComponent.prototype.packagePage = function () {
        console.log(this.addPackageForm.controls['featureList']);
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
        //console.log('Reactive Form Data: ')
        //console.log(this.profileUpdateForm.value);
        console.log(this.addPackageForm.value);
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
        this.getAllVendors();
    };
    AdminAddPackageComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
    };
    //get vendors
    AdminAddPackageComponent.prototype.getAllVendors = function () {
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
    AdminAddPackageComponent.prototype.ngOnDestroy = function () {
    };
    AdminAddPackageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-add-package',
            templateUrl: './admin.add.package.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, index_1.PackageServices, index_1.VendorServices])
    ], AdminAddPackageComponent);
    return AdminAddPackageComponent;
}());
exports.AdminAddPackageComponent = AdminAddPackageComponent;
//# sourceMappingURL=admin.add.package.component.js.map