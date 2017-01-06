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
var TopnavComponent = (function () {
    // parties: Observable<any[]>;
    // parties: Observable<Party[]>;
    function TopnavComponent() {
        // this.parties = Parties.find({}).zone();
    }
    TopnavComponent.prototype.ngAfterViewInit = function () {
        $(document).ready(function () {
            $(".s-box").selectbox();
        });
    };
    TopnavComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'topnav',
            templateUrl: './topnav.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], TopnavComponent);
    return TopnavComponent;
}());
exports.TopnavComponent = TopnavComponent;
//# sourceMappingURL=topnav.component.js.map