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
var index_1 = require('../../services/index');
var user_model_1 = require('../../models/user.model');
var http_1 = require('@angular/http');
var custom_validator_1 = require('../../validators/custom.validator');
var EditUserProfileComponent = (function () {
    function EditUserProfileComponent(http, fb, router, authenticationService, userService) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.pagetitle = "Update Profile";
        this.userProfile = {};
        this.profile = new user_model_1.UserModel(); //user profile interface or model
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.profileUpdateForm = this.fb.group({
            // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
            id: ['', forms_1.Validators.required],
            //username: [data.name, Validators.compose([Validators.required, Validators.minLength(5)]),this.customValidator.usernameTaken],
            username: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5)])],
            useremail: ['', forms_1.Validators.compose([this.customValidator.validEmail, forms_1.Validators.required]), forms_1.Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
            userphone: '',
            addresslineone: ['', forms_1.Validators.required],
            addresslinetwo: '',
            usercity: '',
            usercountry: '',
            zipcode: [''],
        });
    }
    EditUserProfileComponent.prototype.ngOnInit = function () {
        // initialize model here
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('currentUser')).token;
        this.userService.getUserProfile(userData._id)
            .subscribe(function (data) {
            _this.profileUpdateForm.controls['id'].setValue(data._id);
            _this.profileUpdateForm.controls['username'].setValue(data.name);
            _this.profileUpdateForm.controls['useremail'].setValue(data.email);
            _this.profileUpdateForm.controls['userphone'].setValue(data.phone);
            _this.profileUpdateForm.controls['addresslineone'].setValue(data.addresslineone);
            _this.profileUpdateForm.controls['addresslinetwo'].setValue(data.addresslinetwo);
            _this.profileUpdateForm.controls['usercity'].setValue(data.city);
            _this.profileUpdateForm.controls['usercountry'].setValue(data.country);
            _this.profileUpdateForm.controls['zipcode'].setValue(data.zipcode);
        }, function (error) {
            console.log(error);
        });
    };
    EditUserProfileComponent.prototype.ngAfterViewInit = function () {
    };
    EditUserProfileComponent.prototype.profilePage = function () {
        this.router.navigate(['/profile']);
    };
    EditUserProfileComponent.prototype.submitForm = function () {
        var _this = this;
        //console.log('Reactive Form Data: ')
        //console.log(this.profileUpdateForm.value);
        this.userService.updateProfile(this.profileUpdateForm.value)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
                _this.profilePage();
            }
            //this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    EditUserProfileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'update-profile',
            templateUrl: './editUserProfile.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, index_1.AuthenticationService, index_1.UserServices])
    ], EditUserProfileComponent);
    return EditUserProfileComponent;
}());
exports.EditUserProfileComponent = EditUserProfileComponent;
//# sourceMappingURL=editUserProfile.component.js.map