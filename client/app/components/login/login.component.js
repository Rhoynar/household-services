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
var LoginComponent = (function () {
    function LoginComponent(http, fb, route, router, UserServices, authenticationService, alertService) {
        // this.parties = Parties.find({}).zone();
        this.http = http;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.UserServices = UserServices;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.loading = false;
        this.error = '';
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
    }
    LoginComponent.prototype.ngAfterViewInit = function () {
    };
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        //this.authenticationService.logout();
        this.profileSignupForm = this.fb.group({
            username: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
            useremail: ['', forms_1.Validators.compose([this.customValidator.validEmail, forms_1.Validators.required]), forms_1.Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
            userpass: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])],
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.loginUser = function (event) {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.loginuseremail, this.loginuserpass)
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
    LoginComponent.prototype.registerUser = function () {
        var _this = this;
        this.UserServices.registerUser(this.profileSignupForm.value)
            .subscribe(function (data) {
            alert(data.msg);
            _this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            _this.alertService.error(errr.msg, 'signup');
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, index_1.UserServices, index_1.AuthenticationService, index_1.AlertService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map