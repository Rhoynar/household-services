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
//import { UserServices } from './users.services';
var index_1 = require('../services/index');
var GuestGuard = (function () {
    function GuestGuard(UserServices, router) {
        this.UserServices = UserServices;
        this.router = router;
    }
    GuestGuard.prototype.canActivate = function () {
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) {
            switch (currentUser.token.role) {
                case 'admin':
                    this.router.navigate(['/admin']);
                    break;
                case 'vendor':
                    this.router.navigate(['/vendor']);
                    break;
                case 'user':
                    console.log("guest loging ts");
                    this.router.navigate(['/dashboard']);
                    break;
                default:
                    this.router.navigate(['/']);
                    break;
            }
            return false;
        }
        return true;
    };
    GuestGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.UserServices, router_1.Router])
    ], GuestGuard);
    return GuestGuard;
}());
exports.GuestGuard = GuestGuard;
//# sourceMappingURL=guest.guard.js.map