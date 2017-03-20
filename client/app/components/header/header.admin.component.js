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
var AdminHeaderComponent = (function () {
    function AdminHeaderComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            var currentUserStr = localStorage.getItem('currentUser');
            var currentUser = JSON.parse(currentUserStr);
            if (currentUserStr) {
                if (currentUser.token.role == "admin") {
                    _this.loggedIn = true;
                }
            }
            else {
                _this.loggedIn = false;
                _this.router.navigate(['/login']);
            }
        });
    }
    AdminHeaderComponent.prototype.logout = function () {
        var _this = this;
        // reset login status
        this.authenticationService.logout()
            .subscribe(function (data) {
            _this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            _this.router.navigate(['/login']);
        });
    };
    AdminHeaderComponent.prototype.ngAfterViewInit = function () {
    };
    AdminHeaderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'top-admin-header',
            templateUrl: './header.admin.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthenticationService])
    ], AdminHeaderComponent);
    return AdminHeaderComponent;
}());
exports.AdminHeaderComponent = AdminHeaderComponent;
//# sourceMappingURL=header.admin.component.js.map