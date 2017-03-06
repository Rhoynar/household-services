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
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var index_1 = require('../../services/index');
var http_1 = require('@angular/http');
var custom_validator_1 = require('../../validators/custom.validator');
var AdminAddCommunityComponent = (function () {
    //constructor start
    function AdminAddCommunityComponent(http, fb, router, communityServices) {
        this.http = http;
        this.fb = fb;
        this.router = router;
        this.communityServices = communityServices;
        this.loggedIn = false;
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.pagetitle = "New Community";
        this.addCommunityForm = this.fb.group({
            title: ['', forms_1.Validators.required],
            addressLineOne: ['', forms_1.Validators.required],
            addressLineTwo: [''],
            postcode: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required]
        });
    }
    //end of constructor
    //get vendors
    AdminAddCommunityComponent.prototype.communityPage = function () {
        this.router.navigate(['/admin/community']);
    };
    AdminAddCommunityComponent.prototype.submitForm = function () {
        var _this = this;
        this.communityServices.addCommunity(this.addCommunityForm.value)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
                _this.communityPage();
            }
            //this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
        });
    };
    AdminAddCommunityComponent.prototype.ngAfterViewInit = function () {
    };
    AdminAddCommunityComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
    };
    AdminAddCommunityComponent.prototype.ngOnDestroy = function () {
    };
    AdminAddCommunityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-add-community',
            templateUrl: './admin.add.community.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, forms_1.FormBuilder, router_1.Router, index_1.CommunityServices])
    ], AdminAddCommunityComponent);
    return AdminAddCommunityComponent;
}());
exports.AdminAddCommunityComponent = AdminAddCommunityComponent;
//# sourceMappingURL=admin.add.community.component.js.map