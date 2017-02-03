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
var LoginComponent = (function () {
    function LoginComponent(router, UserServices, authenticationService) {
        // this.parties = Parties.find({}).zone();
        this.router = router;
        this.UserServices = UserServices;
        this.authenticationService = authenticationService;
        this.loading = false;
        this.error = '';
    }
    LoginComponent.prototype.ngAfterViewInit = function () {
    };
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        //this.authenticationService.logout();
    };
    LoginComponent.prototype.loginUser = function (event) {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.useremail, this.userpass)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/dashboard']);
            }
            else {
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.UserServices, index_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component (copy).js.map