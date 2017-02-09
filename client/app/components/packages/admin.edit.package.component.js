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
var AdminEditPackageComponent = (function () {
    //constructor start
    function AdminEditPackageComponent(http, router, fb, alertService, activatedRoute, packageServices) {
        this.http = http;
        this.router = router;
        this.fb = fb;
        this.alertService = alertService;
        this.activatedRoute = activatedRoute;
        this.packageServices = packageServices;
        this.loggedIn = false;
        this.packageId = '';
        this.vendorModel = new vendor_model_1.VendorModel();
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.packageDetails = {};
        var params = this.activatedRoute.snapshot.params;
        this.packageId = params.id;
        this.editPackageForm = this.fb.group({
            id: ['', forms_1.Validators.required],
            title: ['', forms_1.Validators.required],
            postcode: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            frequency: ['', forms_1.Validators.required],
            featureList: this.fb.array([])
        });
    }
    //end of constructor
    AdminEditPackageComponent.prototype.initFeature = function () {
        return this.fb.group({
            feature: ['', forms_1.Validators.required]
        });
    };
    AdminEditPackageComponent.prototype.addFeature = function () {
        var control = this.editPackageForm.controls['featureList'];
        control.push(this.initFeature());
    };
    //get vendors
    AdminEditPackageComponent.prototype.packagePage = function () {
        this.router.navigate(['/admin/packages']);
    };
    AdminEditPackageComponent.prototype.removefeature = function (index) {
        var arrayControl = this.editPackageForm.controls['featureList'];
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
                _this.editPackageForm.controls['postcode'].setValue(_this.packageDetails.postalcode);
                _this.editPackageForm.controls['price'].setValue(_this.packageDetails.price);
                _this.editPackageForm.controls['frequency'].setValue(_this.packageDetails.frequency);
                var control = _this.editPackageForm.controls['featureList'];
                for (var _i = 0, _a = _this.packageDetails.features; _i < _a.length; _i++) {
                    var eachFeature = _a[_i];
                    var newControl = _this.initFeature();
                    control.push(newControl);
                    newControl.controls['feature'].setValue(eachFeature);
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
    };
    AdminEditPackageComponent.prototype.ngOnDestroy = function () {
    };
    AdminEditPackageComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-edit-package',
            templateUrl: './admin.edit.package.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, forms_1.FormBuilder, index_1.AlertService, router_1.ActivatedRoute, index_1.PackageServices])
    ], AdminEditPackageComponent);
    return AdminEditPackageComponent;
}());
exports.AdminEditPackageComponent = AdminEditPackageComponent;
//# sourceMappingURL=admin.edit.package.component.js.map