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
var AdminEditCommunityComponent = (function () {
    //constructor start
    function AdminEditCommunityComponent(http, router, fb, alertService, activatedRoute, communityServices) {
        this.http = http;
        this.router = router;
        this.fb = fb;
        this.alertService = alertService;
        this.activatedRoute = activatedRoute;
        this.communityServices = communityServices;
        this.loggedIn = false;
        this.communityId = '';
        this.filesToUpload = [];
        this.formData = new FormData();
        this.customValidator = new custom_validator_1.CustomValidator(this.http);
        this.communityDetails = {};
        this.pagetitle = "Update Package";
        var params = this.activatedRoute.snapshot.params;
        this.communityId = params.id;
        this.editCommunityForm = this.fb.group({
            id: ['', forms_1.Validators.required],
            title: ['', forms_1.Validators.required],
            addressLineOne: ['', forms_1.Validators.required],
            addressLineTwo: [''],
            postcode: ['', forms_1.Validators.required],
            phone: ['', forms_1.Validators.required],
            communityLogo: [''],
            commLogo: ['']
        });
    }
    //end of constructor
    AdminEditCommunityComponent.prototype.communityPage = function () {
        this.router.navigate(['/admin/community']);
    };
    AdminEditCommunityComponent.prototype.submitForm = function () {
        var _this = this;
        this.formData.append('id', this.editCommunityForm.value.id);
        this.formData.append('title', this.editCommunityForm.value.title);
        this.formData.append('addressLineOne', this.editCommunityForm.value.addressLineOne);
        this.formData.append('addressLineTwo', this.editCommunityForm.value.addressLineTwo);
        this.formData.append('postcode', this.editCommunityForm.value.postcode);
        this.formData.append('phone', this.editCommunityForm.value.phone);
        //this.formData.append('commLogo', this.editCommunityForm.value.phone);
        this.communityServices.updateCommunity(this.editCommunityForm.value)
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
            alert(errr.msg);
        });
    };
    AdminEditCommunityComponent.prototype.fileChangeEvent1 = function (event) {
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file = fileList[0];
            this.formData.append('communityLogo', file, file.name);
            console.log(this.formData);
        }
    };
    AdminEditCommunityComponent.prototype.fileChangeEvent12 = function (event) {
        var files = event.target.files;
        var file = files[0];
        var reader = new FileReader();
        reader.onload = function (readerEvt) {
            //this.commLogo = readerEvt.target.result;
            //this.editCommunityForm.controls['communityLogo'].setValue(readerEvt.target.result);          
        };
        reader.readAsBinaryString(file);
    };
    AdminEditCommunityComponent.prototype.fileChangeEvent = function (event) {
        this.readImage(event, this.setAvatar, this);
    };
    AdminEditCommunityComponent.prototype.readImage = function (event, callback, obj) {
        var files = event.target.files;
        var file = files[0];
        var allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/xpng", "image/gif"];
        var a = allowedTypes.indexOf(file.type);
        if (a < 0) {
            alert("File type not allowed");
            obj.editCommunityForm.controls['communityLogo'].setValue('');
            return false;
        }
        this.formData.append('communityLogo', file, file.name);
        var reader = new FileReader();
        reader.onload = function (readerEvt) {
            callback(readerEvt.target.result, obj);
        };
        reader.readAsDataURL(file);
    };
    AdminEditCommunityComponent.prototype.setAvatar = function (img, obj) {
        obj.editCommunityForm.controls['commLogo'].setValue(img);
    };
    AdminEditCommunityComponent.prototype.removeLogo = function () {
        this.editCommunityForm.controls['commLogo'].setValue('');
    };
    AdminEditCommunityComponent.prototype.ngAfterViewInit = function () {
    };
    AdminEditCommunityComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
        this.communityServices.getCommunityByid(this.communityId)
            .subscribe(function (data) {
            if (data.status == "success") {
                _this.communityDetails = data.result;
                _this.editCommunityForm.controls['id'].setValue(_this.communityDetails._id);
                _this.editCommunityForm.controls['title'].setValue(_this.communityDetails.title);
                _this.editCommunityForm.controls['addressLineOne'].setValue(_this.communityDetails.addressLineOne);
                _this.editCommunityForm.controls['addressLineTwo'].setValue(_this.communityDetails.addressLineTwo);
                _this.editCommunityForm.controls['postcode'].setValue(_this.communityDetails.postcode);
                _this.editCommunityForm.controls['phone'].setValue(_this.communityDetails.phone);
                _this.editCommunityForm.controls['commLogo'].setValue(_this.communityDetails.communityLogo);
            }
            else {
                _this.alertService.error(data.msg, 'community-error');
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            //alert(errr.msg);
            _this.alertService.error(errr.msg, 'community-error');
        });
    };
    AdminEditCommunityComponent.prototype.ngOnDestroy = function () {
    };
    AdminEditCommunityComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-edit-community',
            templateUrl: './admin.edit.community.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, forms_1.FormBuilder, index_1.AlertService, router_1.ActivatedRoute, index_1.CommunityServices])
    ], AdminEditCommunityComponent);
    return AdminEditCommunityComponent;
}());
exports.AdminEditCommunityComponent = AdminEditCommunityComponent;
//# sourceMappingURL=admin.edit.community.component.js.map