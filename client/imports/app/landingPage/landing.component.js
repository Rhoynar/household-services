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
// import { Parties } from '../../../both/collections/parties.collection';
// import { Party } from '../../../both/models/party.model';
var jquery_1 = require('meteor/jquery');
var landing_component_html_1 = require('./landing.component.html');
var LandingComponent = (function () {
    // parties: Observable<any[]>;
    // parties: Observable<Party[]>;
    function LandingComponent() {
        // this.parties = Parties.find({}).zone();
    }
    LandingComponent.prototype.ngAfterViewInit = function () {
        jquery_1.$(document).ready(function () {
            jquery_1.$("#owl-demo").owlCarousel({
                autoPlay: 3000,
                items: 1,
                itemsDesktop: [1199, 1],
                itemsDesktopSmall: [979, 1],
                itemsTablet: [768, 1],
                navigation: false,
                pagination: false,
                slideSpeed: 300,
                paginationSpeed: 400,
                navigationText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
                transitionStyle: "fade",
            });
            //$(".s-box").selectbox();
        });
    };
    LandingComponent = __decorate([
        core_1.Component({
            selector: 'landing',
            template: landing_component_html_1.default
        }), 
        __metadata('design:paramtypes', [])
    ], LandingComponent);
    return LandingComponent;
}());
exports.LandingComponent = LandingComponent;
//# sourceMappingURL=landing.component.js.map