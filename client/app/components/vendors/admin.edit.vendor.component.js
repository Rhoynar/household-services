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
var AdminEditVendorComponent = (function () {
    //constructor start
    function AdminEditVendorComponent(http, fb, router, alertService, activatedRoute, vendorService) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.alertService = alertService;
        this.activatedRoute = activatedRoute;
        this.vendorService = vendorService;
        this.loggedIn = false;
        this.vendorId = '';
        this.vendorModel = new vendor_model_1.VendorModel();
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        var params = this.activatedRoute.snapshot.params;
        this.vendorId = params.id;
        this.editVendorForm = this.fb.group({
            // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
            id: ['', forms_1.Validators.required],
            vendorName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
            vendorphone: '',
            addresslineone: ['', forms_1.Validators.required],
            vendorEmail: ['', forms_1.Validators.compose([this.customValidator.validEmail, forms_1.Validators.required])],
            addresslinetwo: '',
            vendorcity: '',
            vendorcountry: '',
            vendorzip: ['', forms_1.Validators.required],
        });
    }
    //end of constructor
    //get vendors
    AdminEditVendorComponent.prototype.vendorPage = function () {
        this.router.navigate(['/admin/vendors']);
    };
    AdminEditVendorComponent.prototype.submitForm = function () {
        var _this = this;
        //console.log('Reactive Form Data: ')
        //console.log(this.profileUpdateForm.value);
        this.vendorService.updateVendors(this.editVendorForm.value)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
                _this.vendorPage();
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
    AdminEditVendorComponent.prototype.ngAfterViewInit = function () {
    };
    AdminEditVendorComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
        this.vendorService.getVendorByid(this.vendorId)
            .subscribe(function (data) {
            if (data.status == "success") {
                var vendorDetails = data.result;
                _this.editVendorForm.controls['id'].setValue(vendorDetails._id);
                _this.editVendorForm.controls['vendorName'].setValue(vendorDetails.name);
                _this.editVendorForm.controls['vendorphone'].setValue(vendorDetails.phone);
                _this.editVendorForm.controls['addresslineone'].setValue(vendorDetails.addresslineone);
                _this.editVendorForm.controls['vendorEmail'].setValue(vendorDetails.email);
                _this.editVendorForm.controls['addresslinetwo'].setValue(vendorDetails.addresslinetwo);
                _this.editVendorForm.controls['vendorcity'].setValue(vendorDetails.city);
                _this.editVendorForm.controls['vendorcountry'].setValue(vendorDetails.country);
                _this.editVendorForm.controls['vendorzip'].setValue(vendorDetails.zipcode);
            }
            else {
                _this.alertService.error(data.msg, 'package-error');
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            //alert(errr.msg);
            _this.alertService.error(errr.msg, 'package-error');
        });
    };
    AdminEditVendorComponent.prototype.ngOnDestroy = function () {
    };
    AdminEditVendorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'edit-vendor',
            templateUrl: './admin.edit.vendor.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, index_1.AlertService, router_1.ActivatedRoute, index_1.VendorServices])
    ], AdminEditVendorComponent);
    return AdminEditVendorComponent;
}());
exports.AdminEditVendorComponent = AdminEditVendorComponent;
//# sourceMappingURL=admin.edit.vendor.component.js.map