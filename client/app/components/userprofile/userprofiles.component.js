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
var UserprofileComponent = (function () {
    function UserprofileComponent(router, authenticationService, userService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.userProfile = {};
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            if (result === false) {
                _this.router.navigate(['/login']);
            }
        });
    }
    UserprofileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('currentUser')).token;
        this.userService.getUserProfile(userData._id)
            .subscribe(function (data) {
            _this.userProfile = data;
        }, function (error) {
            console.log(error);
        });
    };
    UserprofileComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $(".s-box").selectbox();
        });
    };
    UserprofileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'userprofile',
            templateUrl: './userprofiles.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthenticationService, index_1.UserServices])
    ], UserprofileComponent);
    return UserprofileComponent;
}());
exports.UserprofileComponent = UserprofileComponent;
//# sourceMappingURL=userprofiles.component.js.map