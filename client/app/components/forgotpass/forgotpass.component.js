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
var ForgotPassComponent = (function () {
    function ForgotPassComponent(http, fb, route, router, authenticationService, UserServices, alertService) {
        this.http = http;
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.UserServices = UserServices;
        this.alertService = alertService;
        this.pagetitle = "Forgot Password";
        this.loading = false;
        this.error = '';
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
    }
    ForgotPassComponent.prototype.ngOnInit = function () {
        this.forgotPassForm = this.fb.group({
            useremail: ['', forms_1.Validators.compose([this.customValidator.validEmail, forms_1.Validators.required])],
        });
    };
    ForgotPassComponent.prototype.submitForm = function () {
        var _this = this;
        this.UserServices.forgotPass(this.forgotPassForm.value)
            .subscribe(function (data) {
            _this.alertService.success(data.msg, 'forgotpass');
            //this.router.navigate(['/confirmsignup/' + data.sort_msg]);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            _this.alertService.error(errr.msg, 'forgotpass');
        });
    };
    ForgotPassComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'forgot-pass',
            templateUrl: './forgotpass.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, index_1.AuthenticationService, index_1.UserServices, index_1.AlertService])
    ], ForgotPassComponent);
    return ForgotPassComponent;
}());
exports.ForgotPassComponent = ForgotPassComponent;
//# sourceMappingURL=forgotpass.component.js.map