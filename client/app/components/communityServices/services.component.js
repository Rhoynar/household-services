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
var index_1 = require('../../services/index');
var ServicesComponent = (function () {
    //constructor start
    function ServicesComponent(router, communityService, stripeServices) {
        // this.parties = Parties.find({}).zone();
        this.router = router;
        this.communityService = communityService;
        this.stripeServices = stripeServices;
        this.selectedCommunity = { id: '', name: '' };
        this.loggedIn = false;
        this.servicesVisibility = false; //show services by default
        this.stripeCards = [];
        this.cardListVisibility = true; //hidden
        this.cardFormVisibility = true; //hidden
        this.stripeCustomerId = '';
        this.selectedService = {};
        this.selectedServiceVision = true; //hidden
        this.selectedCardId = '';
    }
    //end of constructor
    ServicesComponent.prototype.buyService = function (serviceId, serviceIndex) {
        this.selectedService = this.availableServices[serviceIndex];
        this.getCards();
        this.servicesVisibility = true; //hide this section
        this.selectedServiceVision = false; //show
    };
    ServicesComponent.prototype.cancelPurchase = function () {
        this.servicesVisibility = false; //show this section
        this.cardListVisibility = true; //hide
        this.cardFormVisibility = true;
        this.selectedServiceVision = true; //hide
    };
    ServicesComponent.prototype.selectCard = function (cardDetails) {
        this.cvc = '';
        this.selectedCardId = cardDetails.id;
    };
    ServicesComponent.prototype.makePayment = function (cardDetails) {
        var _this = this;
        this.selectedCardId = cardDetails.id;
        var con = confirm('Are you Sure, you wanna make this payment?');
        if (con) {
            this.stripeServices.createServiceCharge(cardDetails, this.selectedService)
                .subscribe(function (data) {
                alert(data.msg);
                _this.router.navigate(['/deals']);
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                alert(errr.msg);
            });
        }
    };
    ServicesComponent.prototype.addCardAndPay = function () {
        var _this = this;
        this.stripeServices.postCardAndServiceDetails({
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc,
        }, this.selectedService)
            .subscribe(function (data) {
            if (data.status == 'error') {
                alert(data.error);
            }
            else {
                alert(data.msg);
            }
            _this.getCards();
            _this.router.navigate(['/deals']);
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    //get users credit cards
    ServicesComponent.prototype.getCards = function () {
        var _this = this;
        this.stripeServices.getCards()
            .subscribe(function (data) {
            _this.stripeCustomerId = data.stripe_cus_id;
            _this.stripeCards = data.result;
            if (_this.stripeCards.length > 0) {
                _this.cardListVisibility = false; //shown
                _this.cardFormVisibility = true;
            }
            else {
                _this.cardListVisibility = true; //hidden
                _this.cardFormVisibility = false; //shown 
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
    ServicesComponent.prototype.toggleCards = function () {
        this.selectedCardId = '';
        this.cardFormVisibility = !this.cardFormVisibility; //shown 
        this.cardListVisibility = !this.cardListVisibility; //shown 
    };
    ServicesComponent.prototype.myCrazyCallback = function (test) {
        var _this = this;
        // console.log(test);
        this.selectedCommunity = test;
        //this.getAvailableServices();
        this.communityService.getAllServices(this.selectedCommunity)
            .subscribe(function (data) {
            if (data.status == 'success') {
                _this.availableServices = data.result;
            }
        }, function (error) {
            _this.router.navigate(['/login']);
        });
    };
    ServicesComponent.prototype.getAvailableServices = function () {
        var _this = this;
        if (localStorage.getItem('selectedCommunity')) {
            this.selectedCommunity = JSON.parse(localStorage.getItem('selectedCommunity'));
        }
        this.communityService.getAllServices(this.selectedCommunity)
            .subscribe(function (data) {
            if (data.status == 'success') {
                _this.availableServices = data.result;
            }
        }, function (error) {
            _this.router.navigate(['/login']);
        });
    };
    ServicesComponent.prototype.ngAfterViewInit = function () {
        this.getAvailableServices();
    };
    ServicesComponent.prototype.ngOnInit = function () {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            this.loggedIn = true;
        }
    };
    ServicesComponent.prototype.ngOnDestroy = function () {
    };
    ServicesComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'dashboard',
            templateUrl: './services.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.CommunityServices, index_1.StripeServices])
    ], ServicesComponent);
    return ServicesComponent;
}());
exports.ServicesComponent = ServicesComponent;
//# sourceMappingURL=services.component.js.map