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
var index_1 = require('./components/index');
//installed modules
var ng2_bootstrap_1 = require('ng2-bootstrap');
var core_2 = require("angular2-google-maps/core");
var index_2 = require('./guards/index');
var index_3 = require('./services/index');
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
                app_component_1.AppComponent,
                index_1.ServicesComponent,
                index_1.TopnavComponent,
                index_1.TopnavOneComponent,
                index_1.footerSectionComponent,
                index_1.LandingComponent,
                index_1.LandingOneComponent,
                index_1.LoginComponent,
                index_1.SignupComponent,
                index_1.PackagesComponent,
                index_1.PackagessectionComponent,
                index_1.UserprofileComponent,
                index_1.DashboardComponent,
                index_1.TokenComponent,
                index_1.StripesComponent,
                index_1.EditprofileComponent,
                index_1.DealsComponent
            ],
            providers: [index_2.AuthGuard, index_2.NotAuthGuard, index_3.CommunityServices, index_3.UserServices, index_3.AuthenticationService, index_3.StripeServices],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map