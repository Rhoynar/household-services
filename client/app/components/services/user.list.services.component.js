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
var UserListServicesComponent = (function () {
    function UserListServicesComponent(router, fb, packageService, activatedRoute, alertService, userService, authenticationService, communityServices) {
        var _this = this;
        this.router = router;
        this.fb = fb;
        this.packageService = packageService;
        this.activatedRoute = activatedRoute;
        this.alertService = alertService;
        this.userService = userService;
        this.authenticationService = authenticationService;
        this.communityServices = communityServices;
        this.loggedIn = false;
        this.zipcode = "";
        this.pagetitle = "Services in your Community";
        this.userCommunityId = '';
        this.selectedCommunity = {};
        this.getAllPackage();
        var params = this.activatedRoute.snapshot.queryParams;
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        console.log(currentUser);
        this.zipcode = params.zip;
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            var currentUserStr = localStorage.getItem('currentUser');
            var currentUser = JSON.parse(currentUserStr);
            if (currentUserStr) {
                if (currentUser.token.role == "user") {
                    _this.loggedIn = true;
                }
            }
            else {
                _this.loggedIn = false;
            }
        });
        if (params.zip) {
            this.getPackageByZipcode();
        }
        else if (currentUserStr) {
            this.zipcode = currentUser.token.zipcode;
            if (currentUser.token.cummunityId) {
                this.userCommunityId = currentUser.token.cummunityId;
                this.communityServices.getCommunityByid(this.userCommunityId)
                    .subscribe(function (data) {
                    _this.selectedCommunity = data.result;
                }, function (error) {
                    var body = error.json() || '';
                    var err = body.error || JSON.stringify(body);
                    var errr = JSON.parse(err);
                    alert(errr.msg);
                });
            }
            if (this.zipcode != '') {
                this.getPackageByZipcode();
            }
        }
        else {
            this.pagetitle = "Services from all communities";
            this.getAllPackage();
        }
    }
    //get packages
    UserListServicesComponent.prototype.getAllPackage = function () {
        var _this = this;
        this.packageService.getAllPackage()
            .subscribe(function (data) {
            _this.packageList = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    UserListServicesComponent.prototype.selectCommunity = function () {
        if (this.userCommunityId == '') {
            alert("Select any community");
            return false;
        }
        //this.selectedCommunity = this.communityList[index];
        //this.userCommunityId = this.selectedCommunity._id;
        console.log(this.userCommunityId);
        var userData = { userData: { zipcode: this.zipcode, cummunityId: this.userCommunityId } };
        this.userService.updateUserProfile(userData)
            .subscribe(function (data) {
        }, function (error) {
        });
    };
    UserListServicesComponent.prototype.cancelCommunitySelection = function () {
        this.selectedCommunity = {};
        this.userCommunityId = '';
    };
    UserListServicesComponent.prototype.getPackageByZipcode = function () {
        var _this = this;
        this.communityServices.getCommunityByZipCode(this.zipcode)
            .subscribe(function (data) {
            _this.communityList = data.result;
            if (_this.communityList.length == 0) {
                //this.router.navigate(['/noservice/'+this.zipcode]);
                _this.router.navigate(['/noservice'], { queryParams: { zip: _this.zipcode } });
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    //get packages
    /*getPackageByZipcode() {
      this.packageService.getPackageByZipcode(this.zipcode)
        .subscribe(data => {
          this.packageList = data.result;
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);
          alert(errr.msg);
  
        }
        );
    }*/
    UserListServicesComponent.prototype.searchService = function () {
        this.zipcode = this.searchServicesForm.value.zipcode;
        this.getPackageByZipcode();
    };
    UserListServicesComponent.prototype.ngAfterViewInit = function () {
    };
    UserListServicesComponent.prototype.ngOnInit = function () {
        this.searchServicesForm = this.fb.group({
            zipcode: ['', forms_1.Validators.compose([forms_1.Validators.required])],
        });
    };
    UserListServicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-services-list',
            templateUrl: './user.list.services.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, index_1.PackageServices, router_1.ActivatedRoute, index_1.AlertService, index_1.UserServices, index_1.AuthenticationService, index_1.CommunityServices])
    ], UserListServicesComponent);
    return UserListServicesComponent;
}());
exports.UserListServicesComponent = UserListServicesComponent;
//# sourceMappingURL=user.list.services.component.js.map