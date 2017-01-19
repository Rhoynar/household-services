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
var TopnavComponent = (function () {
    function TopnavComponent(router, authenticationService, communityService) {
        var _this = this;
        this.router = router;
        this.authenticationService = authenticationService;
        this.communityService = communityService;
        this.communities = [];
        this.communityChanged = false;
        this.selectedCommunity = { id: '', name: 'Select Community' };
        this.communityDropdownVisible = false;
        // this.parties = Parties.find({}).zone();
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
        if (localStorage.getItem('selectedCommunity')) {
            this.selectedCommunity = JSON.parse(localStorage.getItem('selectedCommunity'));
        }
        this.communityService.getCommunities()
            .subscribe(function (data) {
            if (data.status == 'success') {
                _this.communities = data.result;
                _this.communityChanged = true;
            }
        }, function (error) {
            _this.router.navigate(['/login']);
        });
    }
    TopnavComponent.prototype.showDropDown = function () {
        this.communityDropdownVisible = true;
    };
    TopnavComponent.prototype.onCommunityChange = function (id, name) {
        //this.selectedCommunity = newValue;
        this.communityDropdownVisible = false;
        this.selectedCommunity = { id: id, name: name };
        localStorage.setItem('selectedCommunity', JSON.stringify(this.selectedCommunity));
    };
    TopnavComponent.prototype.ngAfterViewInit = function () {
        // $(document).ready(function () {
        //   $(".s-box").selectbox();
        // });
    };
    TopnavComponent.prototype.logout = function () {
        var _this = this;
        // reset login status
        this.authenticationService.logout()
            .subscribe(function (data) {
            _this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            _this.router.navigate(['/login']);
        });
    };
    TopnavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'topnav',
            templateUrl: './topnav.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.AuthenticationService, index_1.CommunityServices])
    ], TopnavComponent);
    return TopnavComponent;
}());
exports.TopnavComponent = TopnavComponent;
//# sourceMappingURL=topnav.component.js.map