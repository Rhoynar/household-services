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
var index_1 = require('../../services/index');
var StripesComponent = (function () {
    function StripesComponent(_zone, stripeServices) {
        this._zone = _zone;
        this.stripeServices = stripeServices;
        this.getCards();
    }
    StripesComponent.prototype.getCards = function () {
        var _this = this;
        this.stripeServices.getCards()
            .subscribe(function (data) {
            if (data.status == 'error') {
                console.log(data.msg);
            }
            else {
                _this.stripeCards = data.result;
            }
            //this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    StripesComponent.prototype.getToken = function () {
        var _this = this;
        this.stripeServices.postCardDetails({
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc
        })
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
            }
            _this.getCards();
            //this.router.navigate(['/login']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
        /*this.message = 'Loading...';
    
        (<any>window).Stripe.card.createToken({
          number: this.cardNumber,
          exp_month: this.expiryMonth,
          exp_year: this.expiryYear,
          cvc: this.cvc
        }, (status: number, response: any) => {
          console.log(response);
          // Wrapping inside the Angular zone
          this._zone.run(() => {
            if (status === 200) {
              this.message = `Success! Card token ${response.card.id}.`;
            } else {
              this.message = response.error.message;
            }
          });
        });*/
    };
    StripesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'stripe-payments',
            templateUrl: './stripe.component.html'
        }), 
        __metadata('design:paramtypes', [core_1.NgZone, index_1.StripeServices])
    ], StripesComponent);
    return StripesComponent;
}());
exports.StripesComponent = StripesComponent;
//# sourceMappingURL=stripe.component.js.map