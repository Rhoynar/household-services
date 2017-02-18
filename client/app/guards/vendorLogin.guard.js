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
var VendorLoginGuard = (function () {
    function VendorLoginGuard(router) {
        this.router = router;
    }
    VendorLoginGuard.prototype.canActivate = function (route, state) {
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) {
            if (currentUser.token.role == "vendor") {
                return true;
            }
            else {
                switch (currentUser.token.role) {
                    case 'admin':
                        this.router.navigate(['/admin']);
                        break;
                    case 'vendor':
                        this.router.navigate(['/vendor']);
                        break;
                    case 'user':
                        this.router.navigate(['/dashboard']);
                        break;
                    default:
                        this.router.navigate(['/dashboard']);
                        break;
                }
                return false;
            }
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    VendorLoginGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [router_1.Router])
    ], VendorLoginGuard);
    return VendorLoginGuard;
}());
exports.VendorLoginGuard = VendorLoginGuard;
//# sourceMappingURL=vendorLogin.guard.js.map