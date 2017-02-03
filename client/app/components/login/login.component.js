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
    function LoginComponent(http, fb, router, UserServices, authenticationService) {
        // this.parties = Parties.find({}).zone();
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.UserServices = UserServices;
        this.authenticationService = authenticationService;
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
    };
    LoginComponent.prototype.loginUser = function (event) {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.loginuseremail, this.loginuserpass)
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
            alert(errr.msg);
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, index_1.UserServices, index_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map