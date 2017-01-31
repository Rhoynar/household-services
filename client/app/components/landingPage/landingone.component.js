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
var core_2 = require('angular2-google-maps/core');
var LandingOneComponent = (function () {
    function LandingOneComponent(mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.searchControl = '';
    }
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
                });
            });
        });
    };
    LandingOneComponent.prototype.ngAfterViewInit = function () {
    };
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
        __metadata('design:paramtypes', [core_2.MapsAPILoader, core_1.NgZone])
    ], LandingOneComponent);
    return LandingOneComponent;
}());
exports.LandingOneComponent = LandingOneComponent;
//# sourceMappingURL=landingone.component.js.map