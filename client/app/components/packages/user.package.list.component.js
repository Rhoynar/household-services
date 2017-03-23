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
var UserPackageListComponent = (function () {
    //constructor start
    function UserPackageListComponent(router, packageService, activatedRoute, alertService, stripeServices, orderServices) {
        this.router = router;
        this.packageService = packageService;
        this.activatedRoute = activatedRoute;
        this.alertService = alertService;
        this.stripeServices = stripeServices;
        this.orderServices = orderServices;
        this.availablePackages = [];
        this.userCreditCards = [];
        this.pagetitle = "Package List";
        this.zipcode = "";
        this.selectedPackage = {};
        this.selectedPackageId = "";
        this.preferedDate = "";
        this.preferedType = "";
        this.additionalInstruction = "";
        this.selDate = { year: 0, month: 0, day: 0 };
        this.cardsvisible = false;
        this.useCardId = '';
        this.processingCard = false;
        this.cardNumber = '';
        this.expiryMonth = '';
        this.expiryYear = '';
        this.cvc = '';
        this.packagePrice = '';
        this.packageDay = '';
        this.packageMeridian = '';
        this.packagePriceType = "";
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'dd-mm-yyyy',
            editableDateField: false,
            openSelectorOnInputClick: true,
            disableUntil: { year: 0, month: 0, day: 0 }
        };
        var d = new Date();
        this.selDate = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.myDatePickerOptions.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate() - 1
        };
        var params = this.activatedRoute.snapshot.queryParams;
        this.zipcode = params.zip;
        this.getAllPackage();
    }
    UserPackageListComponent.prototype.onDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    };
    //end of constructor
    UserPackageListComponent.prototype.selectPackage = function (index) {
        this.selectedPackage = this.availablePackages[index];
    };
    //get packages
    UserPackageListComponent.prototype.getAllPackage = function () {
        var _this = this;
        this.packageService.getAllPackage()
            .subscribe(function (data) {
            _this.availablePackages = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    UserPackageListComponent.prototype.getWeekDayCount = function (weekDay) {
        var weekDayNumber = 0;
        switch (weekDay) {
            case 'su':
            case 'sun':
                weekDayNumber = 1;
                break;
            case 'mo':
            case 'mon':
                weekDayNumber = 2;
                break;
            case 'tu':
            case 'tue':
                weekDayNumber = 3;
                break;
            case 'we':
            case 'wed':
                weekDayNumber = 4;
                break;
            case 'th':
            case 'thur':
                weekDayNumber = 5;
                break;
            case 'fr':
            case 'fri':
                weekDayNumber = 6;
                break;
            case 'sa':
            case 'sat':
                weekDayNumber = 7;
                break;
        }
        return weekDayNumber - 1;
    };
    UserPackageListComponent.prototype.setPriceDetails = function (price, day, meridian) {
        this.packagePrice = price;
        this.packageDay = day;
        this.packageMeridian = meridian;
        //this.myDatePickerOptions.enableDays = [];
        var d = new Date();
        var currDay = d.getDay();
        var selDayCount = this.getWeekDayCount(day);
        if (selDayCount - currDay == 0) {
            this.selDate = {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate()
            };
        }
        else if ((currDay - selDayCount) > 0) {
            this.selDate = {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate() + (7 - (currDay - selDayCount))
            };
        }
        else if ((selDayCount - currDay) > 0) {
            this.selDate = {
                year: d.getFullYear(),
                month: d.getMonth() + 1,
                day: d.getDate() + (selDayCount - currDay)
            };
        }
        this.preferedDate = this.selDate;
    };
    UserPackageListComponent.prototype.cancelSelection = function () {
        this.selectedPackageId = "";
        this.preferedDate = "";
        this.preferedType = "";
        this.selectedPackage = {};
        this.additionalInstruction = "";
        this.packagePrice = "";
        this.packageDay = "";
        this.packageMeridian = "";
        this.packagePriceType = "";
    };
    UserPackageListComponent.prototype.cancelPurchase = function () {
        this.cardsvisible = false;
        this.cardNumber = '';
        this.expiryMonth = '';
        this.expiryYear = '';
        this.cvc = '';
        this.cancelSelection();
    };
    UserPackageListComponent.prototype.submitForm = function (form) {
        if (this.preferedType != '' && this.preferedDate.epoc > 0) {
            var orderDetails = {
                "serviceDate": this.preferedDate.date,
                "serviceType": this.preferedType,
                "instruction": this.additionalInstruction,
                "packageId": this.selectedPackageId
            };
            this.cardsvisible = true;
        }
        else {
            this.alertService.error("Please complete form", 'additional-form');
        }
    };
    //get users credit cards
    UserPackageListComponent.prototype.getCards = function () {
        var _this = this;
        this.stripeServices.getCards()
            .subscribe(function (data) {
            //this.stripeCustomerId = data.stripe_cus_id;
            _this.userCreditCards = data.result;
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
            if (error.status) {
                _this.router.navigate(['/login']);
            }
        });
    };
    UserPackageListComponent.prototype.makePayment = function (cardDetails) {
        var _this = this;
        var orderDetails = {
            "serviceDate": this.preferedDate.date,
            "serviceType": this.preferedType,
            "instruction": this.additionalInstruction,
            "packageId": this.selectedPackageId
        };
        var con = confirm('Are you Sure, you wanna make this payment?');
        if (con) {
            this.processingCard = true;
            //carddetail,orderdetail,newcard,savecard
            this.stripeServices.makePayment(cardDetails, orderDetails, false, false)
                .subscribe(function (data) {
                _this.processingCard = false;
                _this.router.navigate(['/order']);
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                //alert(errr.msg);
                _this.alertService.error(errr.msg, 'card-error');
                if (error.status) {
                    _this.router.navigate(['/login']);
                }
            });
        }
    };
    UserPackageListComponent.prototype.payWithNewCard = function (saveCard) {
        var _this = this;
        var orderDetails = {
            "serviceDate": this.preferedDate.date,
            "serviceType": this.preferedType,
            "instruction": this.additionalInstruction,
            "packageId": this.selectedPackageId
        };
        var cardDetails = {
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc
        };
        var con = confirm('Are you Sure, you wanna make this payment?');
        if (con) {
            this.processingCard = true;
            //this.stripeServices.payWithNewCard(cardDetails, orderDetails)
            //carddetail,orderdetail,newcard,savecard
            this.stripeServices.makePayment(cardDetails, orderDetails, true, saveCard)
                .subscribe(function (data) {
                _this.processingCard = false;
                _this.router.navigate(['/order']);
            }, function (error) {
                var body = error.json() || '';
                var err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                //alert(errr.msg);
                _this.alertService.error(errr.msg, 'card-error');
                if (error.status) {
                    _this.router.navigate(['/login']);
                }
            });
        }
    };
    UserPackageListComponent.prototype.ngAfterViewInit = function () {
        //this.getAllPackage();
        this.getCards();
    };
    UserPackageListComponent.prototype.ngOnInit = function () {
    };
    UserPackageListComponent.prototype.ngOnDestroy = function () {
    };
    UserPackageListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-package-list',
            templateUrl: './user.package.list.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices, router_1.ActivatedRoute, index_1.AlertService, index_1.StripeServices, index_1.OrderServices])
    ], UserPackageListComponent);
    return UserPackageListComponent;
}());
exports.UserPackageListComponent = UserPackageListComponent;
//# sourceMappingURL=user.package.list.component.js.map