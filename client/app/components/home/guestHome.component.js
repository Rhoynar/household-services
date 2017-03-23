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
var core_2 = require('angular2-google-maps/core');
var index_1 = require('../../services/index');
var GuestHomeComponent = (function () {
    function GuestHomeComponent(mapsAPILoader, ngZone, googlePlace, router) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.googlePlace = googlePlace;
        this.router = router;
        this.postal_code = '';
        this.commIcon = 1;
        this.searchControl = true;
        this.searchValue = '';
    }
    GuestHomeComponent.prototype.selCommIcon = function (iconNumber) {
        this.commIcon = iconNumber;
    };
    GuestHomeComponent.prototype.searchPackages = function () {
        if ('' == this.searchValue || '' == this.postal_code) {
            alert("Please enter any address");
            return false;
        }
        else {
            //this.router.navigate(['/package/search']);
            //this.router.navigate(['/package/search'], { queryParams: {zip:this.postal_code} });
            this.router.navigate(['/services'], { queryParams: { zip: this.postal_code } });
        }
    };
    GuestHomeComponent.prototype.ngAfterViewInit = function () {
        /*$(document).ready(function () {
          $("#owl-demo").owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
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
        });*/
    };
    GuestHomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //alert(place);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    _this.postal_code = _this.googlePlace.postal_code(place.address_components) ? _this.googlePlace.postal_code(place.address_components) : null;
                });
            });
        });
    };
    __decorate([
        core_1.ViewChild("search"), 
        __metadata('design:type', core_1.ElementRef)
    ], GuestHomeComponent.prototype, "searchElementRef", void 0);
    GuestHomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'guest-home',
            templateUrl: './guestHome.component.html'
        }), 
        __metadata('design:paramtypes', [core_2.MapsAPILoader, core_1.NgZone, index_1.GooglePlaceService, router_1.Router])
    ], GuestHomeComponent);
    return GuestHomeComponent;
}());
exports.GuestHomeComponent = GuestHomeComponent;
//# sourceMappingURL=guestHome.component.js.map