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
var profile_model_1 = require('../../models/profile.model');
var EditprofileComponent = (function () {
    function EditprofileComponent(router, authenticationService, userService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.userProfile = {};
        this.profile = new profile_model_1.ProfileModel();
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            if (result === false) {
                _this.router.navigate(['/login']);
            }
        });
    }
    EditprofileComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userData = JSON.parse(localStorage.getItem('currentUser')).token;
        this.userService.getUserProfile(userData._id)
            .subscribe(function (data) {
            _this.profile.id = data._id;
            _this.profile.username = data.name;
            _this.profile.useremail = data.email;
        }, function (error) {
            console.log(error);
        });
    };
    EditprofileComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $(".s-box").selectbox();
        });
    };
    EditprofileComponent.prototype.profilePage = function () {
        this.router.navigate(['/profile']);
    };
    EditprofileComponent.prototype.updateProfile = function () {
        var _this = this;
        console.log(this.profile);
        this.userService.updateProfile(this.profile)
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
    EditprofileComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'editprofile',
            templateUrl: './editprofile.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthenticationService, index_1.UserServices])
    ], EditprofileComponent);
    return EditprofileComponent;
}());
exports.EditprofileComponent = EditprofileComponent;
//# sourceMappingURL=editprofile.component.js.map