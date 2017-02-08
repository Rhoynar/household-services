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
var AdminTopnavComponent = (function () {
    function AdminTopnavComponent(router, authenticationService, communityService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.communityService = communityService;
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            console.log(localStorage.getItem('currentUser'));
            var currentUserStr = localStorage.getItem('currentUser');
            var currentUser = JSON.parse(currentUserStr);
            if (currentUserStr) {
                if (currentUser.token.role == "admin") {
                    _this.loggedIn = true;
                }
            }
            if (localStorage.getItem('currentUser')) {
                // logged in so return true
                _this.loggedIn = true;
            }
        });
    }
    AdminTopnavComponent.prototype.logout = function () {
        var _this = this;
        // reset login status
        this.authenticationService.logout()
            .subscribe(function (data) {
            _this.router.navigate(['/admin/login']);
            //return false;
        }, function (error) {
            _this.router.navigate(['/admin/login']);
        });
    };
    AdminTopnavComponent.prototype.ngAfterViewInit = function () {
    };
    AdminTopnavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'topnav-admin',
            templateUrl: './topnavadmin.component.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthenticationService, index_1.CommunityServices])
    ], AdminTopnavComponent);
    return AdminTopnavComponent;
}());
exports.AdminTopnavComponent = AdminTopnavComponent;
//# sourceMappingURL=topnavadmin.component.js.map