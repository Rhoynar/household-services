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
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var topnav_component_1 = require('./components/topNav/topnav.component');
var landing_component_1 = require('./components/landingPage/landing.component');
var login_component_1 = require('./components/login/login.component');
var signup_component_1 = require('./components/signup/signup.component');
var footer_section_component_1 = require('./components/footer-section/footer-section.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var packages_component_1 = require('./components/packages/packages.component');
var packages_section_component_1 = require('./components/packages/packages-section.component');
var userprofiles_component_1 = require('./components/userprofile/userprofiles.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.routes)
            ],
            declarations: [
                app_component_1.AppComponent,
                topnav_component_1.TopnavComponent,
                footer_section_component_1.footerSectionComponent,
                landing_component_1.LandingComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                packages_component_1.PackagesComponent,
                packages_section_component_1.PackagessectionComponent,
                userprofiles_component_1.UserprofileComponent,
                dashboard_component_1.DashboardComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map