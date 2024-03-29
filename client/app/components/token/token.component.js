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
var TokenComponent = (function () {
    function TokenComponent(router, authenticationService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
        // reset login status
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate(['/dashboard']);
            }
            else {
                _this.router.navigate(['/login']);
            }
        });
    }
    TokenComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $(".s-box").selectbox();
        });
    };
    TokenComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'token',
            template: '<div></div>'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthenticationService])
    ], TokenComponent);
    return TokenComponent;
}());
exports.TokenComponent = TokenComponent;
//# sourceMappingURL=token.component.js.map