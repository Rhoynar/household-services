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
var CommunityCalenderComponent = (function () {
    //constructor start
    function CommunityCalenderComponent(router, communityServices, alertService) {
        this.router = router;
        this.communityServices = communityServices;
        this.alertService = alertService;
        this.communityCalender = [];
        this.getAllCommunity();
    }
    //end of constructor
    //get packages
    CommunityCalenderComponent.prototype.getAllCommunity = function () {
        var _this = this;
        this.communityServices.getCommunityCalender()
            .subscribe(function (data) {
            _this.communityCalender = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    CommunityCalenderComponent.prototype.ngAfterViewInit = function () {
    };
    CommunityCalenderComponent.prototype.ngOnInit = function () {
    };
    CommunityCalenderComponent.prototype.ngOnDestroy = function () {
    };
    CommunityCalenderComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'community-calender',
            templateUrl: './community.calender.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.CommunityServices, index_1.AlertService])
    ], CommunityCalenderComponent);
    return CommunityCalenderComponent;
}());
exports.CommunityCalenderComponent = CommunityCalenderComponent;
//# sourceMappingURL=community.calender.component.js.map