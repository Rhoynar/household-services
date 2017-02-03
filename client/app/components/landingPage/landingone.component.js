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
var ng2_bootstrap_1 = require('ng2-bootstrap');
var core_2 = require('angular2-google-maps/core');
var index_1 = require('../../services/index');
var LandingOneComponent = (function () {
    function LandingOneComponent(mapsAPILoader, ngZone, googlePlace, packageService, authenticationService) {
        var _this = this;
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.googlePlace = googlePlace;
        this.packageService = packageService;
        this.authenticationService = authenticationService;
        this.postal_code = '';
        this.searched = false;
        this.loggedIn = false;
        /*street_number: any = '';
        street: any = '';
        city: any = '';
        state: any = '';
        
        district: any = '';
        country: any = '';
        lat: any = '';
        lng: any = '';
        adr_address: any = '';
        name: any = '';
        types: any = '';
        vicinity: any = '';*/
        this.searchControl = '';
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            if (result === false) {
                _this.loggedIn = false;
            }
            else {
                _this.loggedIn = true;
            }
        });
    }
    LandingOneComponent.prototype.hideLearnmoreModal = function () {
        this.learnMoreModal.hide();
        this.searchControl = '';
        this.postal_code = '';
        this.searched = false;
    };
    LandingOneComponent.prototype.ngOnInit = function () {
        var _this = this;
        //create search FormControl
        this.searchControl = '';
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
                    console.log(place);
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    _this.postal_code = _this.googlePlace.postal_code(place.address_components) ? _this.googlePlace.postal_code(place.address_components) : null;
                    /*this.street_number = this.googlePlace.street_number(place.address_components) ?this.googlePlace.street_number(place.address_components) : null;
                    this.street = this.googlePlace.street(place.address_components) ? this.googlePlace.street(place.address_components) : null;
                    this.city = this.googlePlace.city(place.address_components) ? this.googlePlace.city(place.address_components) : null;
                    this.state = this.googlePlace.state(place.address_components) ? this.googlePlace.state(place.address_components) : null;
                    this.district = this.googlePlace.administrative_area_level_2(place.address_components) ? this.googlePlace.administrative_area_level_2(place.address_components) : null;
                    this.country = this.googlePlace.country(place.address_components) ? this.googlePlace.country(place.address_components) : null;
                    this.lat = place.geometry.location.lat() ? place.geometry.location.lat() : null;
                    this.lng = place.geometry.location.lng() ? place.geometry.location.lng() : null;
                    this.adr_address = place.formatted_address ? place.formatted_address : null;
                    this.name = place.name ? place.name : null;
                    this.types = place.types ? place.types : null;
                    this.vicinity = place.vicinity ? place.vicinity : null;*/
                });
            });
        });
    };
    LandingOneComponent.prototype.searchPackages = function () {
        var _this = this;
        if ('' == this.searchControl || '' == this.postal_code) {
            alert("Please enter any address");
            return false;
        }
        this.packageService.getPackageByZipcode(this.postal_code)
            .subscribe(function (data) {
            if (data.status == 'success') {
                _this.packages = data.result;
                _this.searched = true;
            }
        }, function (error) {
        });
    };
    LandingOneComponent.prototype.ngAfterViewInit = function () {
    };
    __decorate([
        core_1.ViewChild('learnMoreModal'), 
        __metadata('design:type', ng2_bootstrap_1.ModalDirective)
    ], LandingOneComponent.prototype, "learnMoreModal", void 0);
    __decorate([
        core_1.ViewChild("search"), 
        __metadata('design:type', core_1.ElementRef)
    ], LandingOneComponent.prototype, "searchElementRef", void 0);
    LandingOneComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'landing-one',
            templateUrl: './landingone.component.html'
        }), 
        __metadata('design:paramtypes', [core_2.MapsAPILoader, core_1.NgZone, index_1.GooglePlaceService, index_1.PackageServices, index_1.AuthenticationService])
    ], LandingOneComponent);
    return LandingOneComponent;
}());
exports.LandingOneComponent = LandingOneComponent;
//# sourceMappingURL=landingone.component.js.map