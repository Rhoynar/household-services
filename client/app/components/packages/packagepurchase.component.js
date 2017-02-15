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
require('rxjs/add/operator/switchMap');
var index_1 = require('../../services/index');
var PackagePurchaseComponent = (function () {
    function PackagePurchaseComponent(activatedRoute, stripeServices, packageServices, router, alertService) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.stripeServices = stripeServices;
        this.packageServices = packageServices;
        this.router = router;
        this.alertService = alertService;
        this.stripeCards = [];
        this.stripeCustomerId = '';
        this.packageId = '';
        this.packageDetails = {};
        this.useCardId = '';
        this.processingCard = false;
        var params = this.activatedRoute.snapshot.params;
        this.packageId = params.id;
        this.packageServices.getPackageByid(this.packageId)
            .subscribe(function (data) {
            if (data.status == "success") {
                _this.packageDetails = data.result;
            }
            else {
                alert(data.msg);
            }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
            _this.alertService.error(errr.msg, 'package-error');
        });
        this.getCards();
    }
    PackagePurchaseComponent.prototype.makePayment = function (cardDetails) {
        var _this = this;
        console.log(this.packageDetails);
        var con = confirm('Are you Sure, you wanna make this payment?');
        if (con) {
            this.processingCard = true;
            var isNewCard = 'no';
            var doSave = 'no';
            this.stripeServices.payPackageWithCard(cardDetails, this.packageDetails, isNewCard, doSave)
                .subscribe(function (data) {
                alert(data.msg);
                _this.processingCard = false;
                _this.router.navigate(['/orders']);
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                //alert(errr.msg);
                _this.alertService.error(errr.msg, 'card-error');
            });
        }
    };
    PackagePurchaseComponent.prototype.payWithCard = function () {
        var _this = this;
        this.processingCard = true;
        this.stripeServices.payPackageWithToken({
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc,
        }, this.packageDetails)
            .subscribe(function (data) {
            _this.processingCard = false;
            if (data.status == 'error') {
                alert(data.error);
                _this.getCards();
            }
            else {
                alert(data.msg);
                _this.router.navigate(['/orders']);
            }
            //
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    PackagePurchaseComponent.prototype.payWithCardAndSave = function () {
        var _this = this;
        this.processingCard = true;
        var isNewCard = 'yes';
        var doSave = 'yes';
        var cardObject = {
            number: this.cardNumber, exp_month: this.expiryMonth,
            exp_year: this.expiryYear, cvc: this.cvc
        };
        this.stripeServices.payPackageWithCard(cardObject, this.packageDetails, isNewCard, doSave)
            .subscribe(function (data) {
            _this.processingCard = false;
            if (data.status == 'error') {
                alert(data.error);
                _this.getCards();
            }
            else {
                alert(data.msg);
                _this.router.navigate(['/orders']);
            }
            //this.getCards();
            //return false;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    PackagePurchaseComponent.prototype.ngAfterViewInit = function () {
    };
    PackagePurchaseComponent.prototype.ngOnInit = function () {
        // this.route.params
        //   // (+) converts string 'id' to a number
        //   .switchMap((params: Params) => this.service.getHero(+params['id']))
        //   .subscribe((hero: Hero) => this.hero = hero);
    };
    //get users credit cards
    PackagePurchaseComponent.prototype.getCards = function () {
        var _this = this;
        this.processingCard = true;
        this.stripeServices.getCards()
            .subscribe(function (data) {
            _this.stripeCustomerId = data.stripe_cus_id;
            _this.stripeCards = data.result;
            _this.processingCard = false;
            // if (this.stripeCards.length > 0) {
            //   this.cardListVisibility = false; //shown
            //   this.cardFormVisibility = true;
            // } else {
            //   this.cardListVisibility = true;  //hidden
            //   this.cardFormVisibility = false; //shown 
            // }
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    PackagePurchaseComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'package-purchase',
            templateUrl: './packagepurchase.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.StripeServices, index_1.PackageServices, router_1.Router, index_1.AlertService])
    ], PackagePurchaseComponent);
    return PackagePurchaseComponent;
}());
exports.PackagePurchaseComponent = PackagePurchaseComponent;
//# sourceMappingURL=packagepurchase.component.js.map