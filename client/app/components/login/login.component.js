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
var users_services_1 = require('../../services/users.services');
var LoginComponent = (function () {
    function LoginComponent(router, UserServices) {
        // this.parties = Parties.find({}).zone();
        this.router = router;
        this.UserServices = UserServices;
    }
    LoginComponent.prototype.ngAfterViewInit = function () {
    };
    LoginComponent.prototype.loginUser = function (event) {
        var _this = this;
        event.preventDefault();
        var user = {
            useremail: this.useremail,
            userpass: this.userpass,
        };
        this.UserServices.loginUser(user)
            .subscribe(function (data) {
            _this.router.navigate(['/dashboard']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, users_services_1.UserServices])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map