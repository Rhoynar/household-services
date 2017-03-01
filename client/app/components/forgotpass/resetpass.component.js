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
var ResetPassComponent = (function () {
    function ResetPassComponent(http, fb, activatedRoute, router, UserServices, alertService) {
        this.http = http;
        this.fb = fb;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.UserServices = UserServices;
        this.alertService = alertService;
        this.pagetitle = "Reset Password";
        this.changeReqDetails = {};
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.validUrl = true;
        this.msgType = "";
        var params = this.activatedRoute.snapshot.params;
        this.requestId = params.id;
        this.resetPassForm = this.fb.group({
            id: [this.requestId, forms_1.Validators.required],
            userId: ['', forms_1.Validators.required],
            userpass: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])],
            retypeuserpass: ['', forms_1.Validators.compose([forms_1.Validators.required, this.customValidator.matches('userpass')])],
        });
    }
    ResetPassComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.UserServices.getForgotReq(this.requestId)
            .subscribe(function (data) {
            if (data.status == "success") {
                _this.changeReqDetails = data.result;
                _this.resetPassForm.controls['userId'].setValue(_this.changeReqDetails.userId._id);
            }
            else {
                _this.validUrl = false;
                _this.msgType = "req_not_found";
                _this.alertService.error(data.msg, 'forgotpass');
            }
            //this.router.navigate(['/confirmsignup/' + data.sort_msg]);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            _this.alertService.error(errr.msg, 'forgotpass');
        });
    };
    ResetPassComponent.prototype.submitForm = function () {
        var _this = this;
        this.UserServices.resetPass(this.resetPassForm.value)
            .subscribe(function (data) {
            _this.alertService.success(data.msg, 'forgotpass');
            _this.validUrl = false;
            _this.msgType = data.msgType;
            //this.router.navigate(['/confirmsignup/' + data.sort_msg]);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            _this.validUrl = false;
            _this.msgType = errr.msgType;
            _this.alertService.error(errr.msg, 'forgotpass');
        });
    };
    ResetPassComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'reset-pass',
            templateUrl: './resetpass.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.ActivatedRoute, router_1.Router, index_1.UserServices, index_1.AlertService])
    ], ResetPassComponent);
    return ResetPassComponent;
}());
exports.ResetPassComponent = ResetPassComponent;
//# sourceMappingURL=resetpass.component.js.map