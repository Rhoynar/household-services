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
var http_1 = require('@angular/http');
var app_component_1 = require('./app.component');
var app_routes_1 = require('./app.routes');
var index_1 = require('./directives/index');
var index_2 = require('./components/index');
//installed modules
var ng2_bootstrap_1 = require('ng2-bootstrap');
var core_2 = require("angular2-google-maps/core");
var index_3 = require('./guards/index');
var index_4 = require('./services/index');
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
                app_routes_1.routing,
                ng2_bootstrap_1.ModalModule.forRoot(),
                core_2.AgmCoreModule.forRoot({
                    apiKey: "AIzaSyD7UAWwbYiO3Xjdp8nES-xp8h7s3YY7jjc",
                    libraries: ["places"]
                }),
            ],
            declarations: [
                app_component_1.AppComponent, index_2.ServicesComponent, index_2.TopnavComponent,
                index_2.TopnavOneComponent, index_2.footerSectionComponent, index_2.LandingComponent,
                index_2.LandingOneComponent, index_2.LoginComponent, index_2.SignupComponent,
                index_2.PackagesComponent, index_2.PackagessectionComponent, index_2.UserprofileComponent,
                index_2.DashboardComponent, index_2.TokenComponent, index_2.StripesComponent,
                index_2.EditprofileComponent, index_2.DealsComponent, index_2.PackagePurchaseComponent,
                index_1.AlertComponent
            ],
            providers: [
                index_3.AuthGuard, index_3.NotAuthGuard, index_4.CommunityServices,
                index_4.UserServices, index_4.AuthenticationService, index_4.StripeServices,
                index_4.GooglePlaceService, index_4.PackageServices, index_4.AlertService
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map