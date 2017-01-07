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
var SignupComponent = (function () {
    function SignupComponent(router, UserServices) {
        // this.parties = Parties.find({}).zone();
        this.router = router;
        this.UserServices = UserServices;
    }
    SignupComponent.prototype.registerUser = function (event) {
        var _this = this;
        event.preventDefault();
        var newUser = {
            username: this.username,
            useremail: this.useremail,
            userpass: this.userpass,
        };
        this.UserServices.registerUser(newUser)
            .subscribe(function (data) {
            alert(data.msg);
            _this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    SignupComponent.prototype.ngAfterViewInit = function () {
    };
    SignupComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'signup',
            templateUrl: './signup.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, users_services_1.UserServices])
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map