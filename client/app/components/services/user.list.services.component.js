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
var index_1 = require('../../services/index');
var UserListServicesComponent = (function () {
    function UserListServicesComponent(fb, packageService, activatedRoute, alertService, authenticationService) {
        this.fb = fb;
        this.packageService = packageService;
        this.activatedRoute = activatedRoute;
        this.alertService = alertService;
        this.authenticationService = authenticationService;
        this.loggedIn = false;
        this.zipcode = "";
        this.pagetitle = "Services";
        var params = this.activatedRoute.snapshot.queryParams;
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        console.log(currentUser);
        this.zipcode = params.zip;
        if (params.zip) {
            this.getPackageByZipcode();
        }
        else if (currentUserStr) {
            this.zipcode = currentUser.token.zipcode;
            this.getPackageByZipcode();
        }
        else {
            this.getAllPackage();
        }
    }
    //get packages
    UserListServicesComponent.prototype.getAllPackage = function () {
        var _this = this;
        this.packageService.getAllPackage()
            .subscribe(function (data) {
            _this.servicesList = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    //get packages
    UserListServicesComponent.prototype.getPackageByZipcode = function () {
        var _this = this;
        this.packageService.getPackageByZipcode(this.zipcode)
            .subscribe(function (data) {
            _this.servicesList = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    UserListServicesComponent.prototype.searchService = function () {
        this.zipcode = this.searchServicesForm.value.zipcode;
        this.getPackageByZipcode();
    };
    UserListServicesComponent.prototype.ngAfterViewInit = function () {
    };
    UserListServicesComponent.prototype.ngOnInit = function () {
        this.searchServicesForm = this.fb.group({
            zipcode: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
        });
    };
    UserListServicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-services-list',
            templateUrl: './user.list.services.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, index_1.PackageServices, router_1.ActivatedRoute, index_1.AlertService, index_1.AuthenticationService])
    ], UserListServicesComponent);
    return UserListServicesComponent;
}());
exports.UserListServicesComponent = UserListServicesComponent;
//# sourceMappingURL=user.list.services.component.js.map