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
var UserNoServicesComponent = (function () {
    function UserNoServicesComponent(http, fb, router, activatedRoute, authenticationService, communityServices, googlePlace) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.authenticationService = authenticationService;
        this.communityServices = communityServices;
        this.googlePlace = googlePlace;
        this.loggedIn = false;
        this.reqReceived = false;
        this.zipcode = "";
        this.addressStr = "";
        this.pagetitle = "No Services";
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        var params = this.activatedRoute.snapshot.queryParams;
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        this.zipcode = params.zip;
        if (!params.zip) {
            this.router.navigate(['/noservice']);
        }
        else {
            this.getZipAddress();
        }
        this.notifyServiceForm = this.fb.group({
            zipcode: [this.zipcode, forms_1.Validators.compose([forms_1.Validators.required])],
            notifyEmail: ['', forms_1.Validators.compose([this.customValidator.validEmail, forms_1.Validators.required])],
        });
    }
    UserNoServicesComponent.prototype.getZipAddress = function () {
        var _this = this;
        this.communityServices.getZipAddress(this.zipcode)
            .subscribe(function (data) {
            if (data.status == 'OK') {
                var place = data.results[0];
                _this.addressStr = '';
                if (_this.googlePlace.postal_code(place.address_components)) {
                    _this.addressStr = _this.googlePlace.postal_code(place.address_components);
                }
                if (_this.googlePlace.city(place.address_components)) {
                    _this.addressStr += ' - ' + _this.googlePlace.city(place.address_components);
                }
                if (_this.googlePlace.stateCode(place.address_components)) {
                    _this.addressStr += ', ' + _this.googlePlace.stateCode(place.address_components);
                }
            }
            else {
                _this.addressStr = "";
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
        //this.notifyServiceForm.controls['zipcode'].setValue(this.zipcode);
    };
    UserNoServicesComponent.prototype.notifyRequest = function () {
        var _this = this;
        console.log(this.notifyServiceForm.value);
        this.communityServices.addServiceDemand(this.notifyServiceForm.value)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                _this.reqReceived = true;
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
    UserNoServicesComponent.prototype.ngAfterViewInit = function () {
    };
    UserNoServicesComponent.prototype.ngOnInit = function () {
    };
    UserNoServicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-no-services-list',
            templateUrl: './user.no.services.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, router_1.ActivatedRoute, index_1.AuthenticationService, index_1.CommunityServices, index_1.GooglePlaceService])
    ], UserNoServicesComponent);
    return UserNoServicesComponent;
}());
exports.UserNoServicesComponent = UserNoServicesComponent;
//# sourceMappingURL=user.no.services.component.js.map