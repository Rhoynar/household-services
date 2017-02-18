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
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var index_1 = require('../../services/index');
var custom_validator_1 = require('../../validators/custom.validator');
var UserLoginComponent = (function () {
    function UserLoginComponent(http, fb, route, router, authenticationService, alertService) {
        this.http = http;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.pagetitle = "Login";
        this.loading = false;
        this.error = '';
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
    }
    UserLoginComponent.prototype.ngOnInit = function () {
        // reset login status
        //this.authenticationService.logout();
        this.loginForm = this.fb.group({
            loginuseremail: ['', forms_1.Validators.compose([this.customValidator.validEmail, forms_1.Validators.required])],
            loginuserpass: ['', forms_1.Validators.compose([forms_1.Validators.required])],
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    };
    UserLoginComponent.prototype.loginUser = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.loginForm.value.loginuseremail, this.loginForm.value.loginuserpass)
            .subscribe(function (result) {
            if (result === true) {
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                _this.error = 'Username or password is incorrect';
                _this.loading = false;
            }
        }, function (error) {
            // In a real world app, we might use a remote logging infrastructure
            var errMsg;
            if (error instanceof http_1.Response) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                //errMsg = `${error.status} - ${error.statusText || ''} ${body.msg}`;
                errMsg = body.msg;
            }
            else {
                errMsg = error.message ? error.message : error.toString();
            }
            _this.alertService.error(errMsg, 'login');
            //return Observable.throw(errMsg);
            //let body = error.json();
            //return Observable.throw(body || { });
        });
    };
    UserLoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-login',
            templateUrl: './userLogin.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, index_1.AuthenticationService, index_1.AlertService])
    ], UserLoginComponent);
    return UserLoginComponent;
}());
exports.UserLoginComponent = UserLoginComponent;
//# sourceMappingURL=userLogin.component.js.map