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
var UserPackageSearchComponent = (function () {
    //constructor start
    function UserPackageSearchComponent(router, packageService, activatedRoute, alertService, orderServices) {
        this.router = router;
        this.packageService = packageService;
        this.activatedRoute = activatedRoute;
        this.alertService = alertService;
        this.orderServices = orderServices;
        this.availablePackages = [];
        this.pagetitle = "Package List";
        this.zipcode = "";
        this.selectedPackage = "";
        this.preferedDate = "";
        this.preferedType = "";
        this.additionalInstruction = "";
        this.selDate = { year: 0, month: 0, day: 0 };
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd-mm-yyyy',
            editableDateField: false,
            openSelectorOnInputClick: true,
            disableUntil: { year: 0, month: 0, day: 0 }
        };
        var d = new Date();
        this.selDate = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.myDatePickerOptions.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate() - 1
        };
        var params = this.activatedRoute.snapshot.queryParams;
        this.zipcode = params.zip;
        if (params.id) {
            this.selectedPackage = params.id;
        }
        this.getPackageByZipcode();
    }
    UserPackageSearchComponent.prototype.onDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    //end of constructor
    //get packages
    UserPackageSearchComponent.prototype.getPackageByZipcode = function () {
        var _this = this;
        this.packageService.getPackageByZipcode(this.zipcode)
            .subscribe(function (data) {
            _this.availablePackages = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    UserPackageSearchComponent.prototype.cancelSelection = function () {
        this.selectedPackage = "";
        this.preferedDate = "";
        this.preferedType = "";
        this.additionalInstruction = "";
    };
    UserPackageSearchComponent.prototype.submitForm = function (form) {
        var _this = this;
        if (this.preferedType != '' && this.preferedDate.epoc > 0) {
            var orderDetails = {
                "serviceDate": this.preferedDate.date,
                "serviceType": this.preferedType,
                "instruction": this.additionalInstruction,
                "packageId": this.selectedPackage
            };
            this.orderServices.createOrder(orderDetails).subscribe(function (data) {
                _this.alertService.success(data.msg, 'additional-form');
                _this.router.navigate(['/dashboard']);
                //return false;
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                _this.alertService.error(errr.msg, 'additional-form');
            });
        }
        else {
            this.alertService.error("Please complete form", 'additional-form');
        }
    };
    UserPackageSearchComponent.prototype.ngAfterViewInit = function () {
        //this.getAllPackage();
    };
    UserPackageSearchComponent.prototype.ngOnInit = function () {
    };
    UserPackageSearchComponent.prototype.ngOnDestroy = function () {
    };
    UserPackageSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-package-search',
            templateUrl: './user.package.search.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices, router_1.ActivatedRoute, index_1.AlertService, index_1.OrderServices])
    ], UserPackageSearchComponent);
    return UserPackageSearchComponent;
}());
exports.UserPackageSearchComponent = UserPackageSearchComponent;
//# sourceMappingURL=user.package.search.component.js.map