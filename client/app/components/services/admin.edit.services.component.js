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
var AdminEditServiceComponent = (function () {
    //constructor start
    function AdminEditServiceComponent(http, router, fb, alertService, activatedRoute, serviceServices) {
        this.http = http;
        this.router = router;
        this.fb = fb;
        this.alertService = alertService;
        this.activatedRoute = activatedRoute;
        this.serviceServices = serviceServices;
        this.loggedIn = false;
        this.serviceId = '';
        this.serviceDetail = {};
        this.pagetitle = "Update Service";
        var params = this.activatedRoute.snapshot.params;
        this.serviceId = params.id;
        this.editServiceForm = this.fb.group({
            id: ['', forms_1.Validators.required],
            title: ['', forms_1.Validators.required]
        });
    }
    //end of constructor
    //service page
    AdminEditServiceComponent.prototype.servicePage = function () {
        this.router.navigate(['/admin/services']);
    };
    AdminEditServiceComponent.prototype.submitForm = function () {
        var _this = this;
        this.serviceServices.updateService(this.editServiceForm.value)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
                _this.servicePage();
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    AdminEditServiceComponent.prototype.ngAfterViewInit = function () {
    };
    AdminEditServiceComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
        this.serviceServices.getServiceByid(this.serviceId)
            .subscribe(function (data) {
            if (data.status == "success") {
                _this.serviceDetail = data.result;
                _this.editServiceForm.controls['id'].setValue(_this.serviceDetail._id);
                _this.editServiceForm.controls['title'].setValue(_this.serviceDetail.title);
            }
            else {
                alert(data.msg);
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            //alert(errr.msg);
            _this.alertService.error(errr.msg, 'service-error');
        });
    };
    AdminEditServiceComponent.prototype.ngOnDestroy = function () {
    };
    AdminEditServiceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'admin-edit-service',
            templateUrl: './admin.edit.services.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, forms_1.FormBuilder, index_1.AlertService, router_1.ActivatedRoute, index_1.ServiceServices])
    ], AdminEditServiceComponent);
    return AdminEditServiceComponent;
}());
exports.AdminEditServiceComponent = AdminEditServiceComponent;
//# sourceMappingURL=admin.edit.services.component.js.map