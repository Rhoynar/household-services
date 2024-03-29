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
var index_1 = require('../../services/index');
var PackagesComponent = (function () {
    function PackagesComponent(packageService, authenticationService) {
        this.packageService = packageService;
        this.authenticationService = authenticationService;
        this.loggedIn = false;
    }
    PackagesComponent.prototype.getAllPackage = function () {
        var _this = this;
        this.packageService.getAllPackage()
            .subscribe(function (data) {
            _this.packages = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    PackagesComponent.prototype.ngAfterViewInit = function () {
        this.getAllPackage();
    };
    PackagesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'packages',
            templateUrl: './packages.component.html'
        }), 
        __metadata('design:paramtypes', [index_1.PackageServices, index_1.AuthenticationService])
    ], PackagesComponent);
    return PackagesComponent;
}());
exports.PackagesComponent = PackagesComponent;
//# sourceMappingURL=packages.component.js.map