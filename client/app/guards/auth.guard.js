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
var AuthGuard = (function () {
    function AuthGuard(UserServices, router) {
        this.UserServices = UserServices;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) {
            if (currentUser.token.role == "user") {
                return true;
            }
            else {
                this.router.navigate(['/admin']);
                return false;
            }
        }
        // not logged in so redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
        //  this.test=this.UserServices.isLoggedIn()
        //   .subscribe(
        //     data => {
        //       console.log(data);
        //       this.authenticated=data;
        //       return true;
        //     },
        //     error => {
        //       //let errMsg: string;
        //       this.authenticated=false;
        //         //this.router.navigate(['/login']);
        //     }
        //   );
        //   console.log(this.test);
        //   // this.router.navigate(['/login']);
        //   // return false;
        //   // console.log(this.test);
        //   // console.log(this.authenticated);
        //   // alert('sd');
        //   if (this.authenticated==false) {
        //         // not logged in so redirect to login page with the return url
        //        // this.router.navigate(['/login']);
        //         return false;
        //     }else{
        //       // logged in so return true
        //       return true;
        //     }
    };
    AuthGuard = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [index_1.UserServices, router_1.Router])
    ], AuthGuard);
    return AuthGuard;
}());
exports.AuthGuard = AuthGuard;
//# sourceMappingURL=auth.guard.js.map