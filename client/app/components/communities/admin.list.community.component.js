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
var AdminCommunityListComponent = (function () {
    //constructor start
    function AdminCommunityListComponent(router, communityServices, alertService) {
        this.router = router;
        this.communityServices = communityServices;
        this.alertService = alertService;
        this.availableCommunities = [];
        this.pagetitle = "Community List";
    }
    //end of constructor
    //get packages
    AdminCommunityListComponent.prototype.getAllCommunity = function () {
        var _this = this;
        this.communityServices.getAllCommunity()
            .subscribe(function (data) {
            _this.availableCommunities = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminCommunityListComponent.prototype.deleteCommunity = function (communityId) {
        var _this = this;
        var con = confirm("Are you sure!, You want to delete this community");
        if (con) {
            this.communityServices.deleteCommunityByid(communityId)
                .subscribe(function (data) {
                if (data.status == 'success') {
                    _this.alertService.success(data.msg, 'communityAlert');
                    _this.getAllCommunity();
                }
                else {
                    _this.alertService.error(data.msg, 'communityAlert');
                }
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                _this.alertService.error(errr.msg, 'communityAlert');
            });
        }
    };
    AdminCommunityListComponent.prototype.ngAfterViewInit = function () {
        this.getAllCommunity();
    };
    AdminCommunityListComponent.prototype.ngOnInit = function () {
    };
    AdminCommunityListComponent.prototype.ngOnDestroy = function () {
    };
    AdminCommunityListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-community-list',
            templateUrl: './admin.list.community.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.CommunityServices, index_1.AlertService])
    ], AdminCommunityListComponent);
    return AdminCommunityListComponent;
}());
exports.AdminCommunityListComponent = AdminCommunityListComponent;
//# sourceMappingURL=admin.list.community.component.js.map