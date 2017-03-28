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
var UserPackageSearchComponent = (function () {
    //constructor start
    function UserPackageSearchComponent(router, packageService, activatedRoute, alertService, communityServices, stripeServices, authenticationService, orderServices) {
        var _this = this;
        this.router = router;
        this.packageService = packageService;
        this.activatedRoute = activatedRoute;
        this.alertService = alertService;
        this.communityServices = communityServices;
        this.stripeServices = stripeServices;
        this.authenticationService = authenticationService;
        this.orderServices = orderServices;
        this.availablePackages = [];
        this.pagetitle = "Package List";
        this.zipcode = "";
        this.selectedPackage = "";
        this.preferedDate = "";
        this.additionalInstruction = "";
        this.selDate = { year: 0, month: 0, day: 0 };
        this.packageCalender = {};
        this.packagePriceType = '';
        this.packagePrice = '';
        this.packageDay = '';
        this.packageMeridian = '';
        this.userCreditCards = [];
        this.cardsvisible = false;
        this.useCardId = '';
        this.processingCard = false;
        this.cardNumber = '';
        this.expiryMonth = '';
        this.expiryYear = '';
        this.cvc = '';
        this.loggedIn = false;
        this.myDatePickerOptions = {
            // other options...
            dateFormat: 'mm-dd-yyyy',
            editableDateField: false,
            openSelectorOnInputClick: false,
            showClearDateBtn: false,
            componentDisabled: true,
            disableUntil: { year: 0, month: 0, day: 0 }
        };
        this.authenticationService.generatetoken()
            .subscribe(function (result) {
            var currentUserStr = localStorage.getItem('currentUser');
            var currentUser = JSON.parse(currentUserStr);
            if (currentUserStr) {
                if (currentUser.token.role == "user") {
                    _this.loggedIn = true;
                }
            }
            else {
                _this.loggedIn = false;
            }
        });
        var d = new Date();
        // this.selDate = {
        //   year: d.getFullYear(),
        //   month: d.getMonth() + 1,
        //   day: d.getDate()
        // };
        this.myDatePickerOptions.disableUntil = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate() - 1
        };
        var params = this.activatedRoute.snapshot.queryParams;
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (params.zip) {
            this.zipcode = params.zip;
        }
        else if (currentUserStr) {
            this.zipcode = currentUser.token.zipcode;
        }
        this.getPackageByZipcode();
        if (params.id) {
            this.selectedPackage = params.id;
        }
        if (params.priceType) {
            this.packagePriceType = params.priceType;
        }
    }
    ;
    UserPackageSearchComponent.prototype.onDateChanged = function (event) {
        // event properties are: event.date, event.jsdate, event.formatted and event.epoc
        //console.log()
    };
    UserPackageSearchComponent.prototype.createEnabledDays = function (startEventNumber, lastEventNumber, eventYear, eventMonth) {
        console.log(startEventNumber + "," + lastEventNumber + "," + eventYear + "," + eventMonth);
        var enableDays = this.myDatePickerOptions.enableDays;
        while (startEventNumber <= lastEventNumber) {
            enableDays.push({ year: eventYear, month: eventMonth, day: startEventNumber });
            startEventNumber = startEventNumber + 7;
        }
        //this.myDatePickerOptions.enableDays= [{ year:2017,  month:3,  day:1},{ year:2017,  month:3,  day:8}];
    };
    UserPackageSearchComponent.prototype.getWeekDayCount = function (weekDay) {
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
    UserPackageSearchComponent.prototype.onCalendarViewChanged = function (event) {
        console.log('onCalendarViewChanged(): Year: ', event.year, ' - month: ', event.month, ' - first: ', event.first, ' - last: ', event.last);
        var dayDiff = this.getWeekDayCount(event.first.weekday) - this.getWeekDayCount(this.packageDay);
        if (dayDiff < 0) {
            dayDiff = 7 + dayDiff;
        }
        //dayDiff++;
        this.createEnabledDays(dayDiff, event.last.number, event.year, event.month);
        switch (event.first.weekday) {
            case 'su':
                break;
            case 'mo':
                break;
            case 'tu':
                break;
            case 'we':
                break;
            case 'th':
                break;
            case 'fr':
                break;
            case 'sa':
                break;
        }
    };
    //end of constructor
    UserPackageSearchComponent.prototype.setPriceDetails = function (price, day, meridian) {
        this.packagePrice = price;
        this.packageDay = day;
        this.packageMeridian = meridian;
        //this.myDatePickerOptions.enableDays = [];
        var d = new Date();
        var currDay = d.getDay();
        var selDayCount = this.getWeekDayCount(day);
        var numberOfDaysToAdd = 0;
        if (selDayCount - currDay == 0) {
            numberOfDaysToAdd = 0;
        }
        else if ((currDay - selDayCount) > 0) {
            numberOfDaysToAdd = 7 - (currDay - selDayCount);
        }
        else if ((selDayCount - currDay) > 0) {
            numberOfDaysToAdd = selDayCount - currDay;
        }
        d.setDate(d.getDate() + numberOfDaysToAdd);
        this.selDate = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            day: d.getDate()
        };
        this.preferedDate = this.selDate;
    };
    //get packages
    UserPackageSearchComponent.prototype.getPackageByZipcode = function () {
        //this.packageService.getPackageByZipcode(this.zipcode)
        /*this.communityServices.getCommunityByZipCode(this.zipcode)
          .subscribe(data => {
            
            //this.availablePackages = data.result;
            for (var i = 0; i < data.result.length; i++) {
              for (var j = 0; j < data.result[i].services.length; j++) {
                
    
                if (typeof(data.result[i].services[j].dailyPackageId) !="undefined" && data.result[i].services[j].dailyPackageId != '') {
    
                  this.availablePackages.push(data.result[i].services[j].dailyPackageId);
    
                  if (this.selectedPackage == data.result[i].services[j].dailyPackageId._id) {
                    this.packageCalender = data.result[i].services[j].dailyPackageId;
                  }
                }
    
                if (typeof(data.result[i].services[j].monthlyPackageId) !="undefined" && data.result[i].services[j].monthlyPackageId != '') {
                  this.availablePackages.push(data.result[i].services[j].monthlyPackageId);
    
                  if (this.selectedPackage == data.result[i].services[j].monthlyPackageId._id) {
                    this.packageCalender = data.result[i].services[j].monthlyPackageId;
                  }
                }
    
              }
            }
            // this.getSelectedPackageDetail();
          },
          error => {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
    
          }
          );*/
        var _this = this;
        this.packageService.getAllPackage()
            .subscribe(function (data) {
            _this.availablePackages = data.result;
            _this.getSelectedPackageDetail();
        }, function (error) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            var errr = JSON.parse(err);
            alert(errr.msg);
        });
    };
    UserPackageSearchComponent.prototype.getSelectedPackageDetail = function () {
        if (this.selectedPackage != '') {
            for (var i = 0; i < this.availablePackages.length; i++) {
                if (this.availablePackages[i]._id == this.selectedPackage) {
                    this.packageCalender = this.availablePackages[i];
                    break;
                }
            }
        }
        if (this.packagePriceType != '') {
            var priceTypeArr = this.packagePriceType.split("_");
            //console.log(this.packageCalender);
            this.setPriceDetails(eval("this.packageCalender." + this.packagePriceType), priceTypeArr[0], priceTypeArr[1]);
        }
    };
    UserPackageSearchComponent.prototype.setSelectedPackageDetail = function (i) {
        this.packageCalender = this.availablePackages[i];
        console.log(this.packageCalender);
    };
    UserPackageSearchComponent.prototype.cancelSelection = function () {
        this.selectedPackage = "";
        this.preferedDate = "";
        this.additionalInstruction = "";
        this.packagePriceType = "";
        this.packagePrice = "";
        this.packageDay = "";
        this.packageMeridian = "";
        this.packageCalender = {};
    };
    UserPackageSearchComponent.prototype.submitForm = function (form) {
        if (this.preferedDate.epoc > 0) {
            var orderDetails = {
                "serviceDate": this.preferedDate.date,
                "serviceType": this.packageCalender.frequency,
                "instruction": this.additionalInstruction,
                "packageId": this.selectedPackage,
                "price": this.packagePrice,
                "packageType": this.packagePriceType,
                "packageDay": this.packageDay,
                "packageMeridian": this.packageMeridian
            };
            this.cardsvisible = true;
        }
        else {
            this.alertService.error("Please complete form", 'additional-form');
        }
    };
    //get users credit cards
    UserPackageSearchComponent.prototype.getCards = function () {
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
    UserPackageSearchComponent.prototype.ngAfterViewInit = function () {
        //this.getAllPackage();
        this.getCards();
    };
    UserPackageSearchComponent.prototype.makePayment = function (cardDetails) {
        var orderDetails = {
            "serviceDate": this.preferedDate.date,
            "serviceType": this.packageCalender.frequency,
            "instruction": this.additionalInstruction,
            "packageId": this.selectedPackage,
            "price": this.packagePrice,
            "packageType": this.packagePriceType,
            "packageDay": this.packageDay,
            "packageMeridian": this.packageMeridian
        };
        this.processPayment(cardDetails, orderDetails, false, false);
    };
    UserPackageSearchComponent.prototype.payWithNewCard = function (saveCard) {
        var orderDetails = {
            "serviceDate": this.preferedDate.date,
            "serviceType": this.packageCalender.frequency,
            "instruction": this.additionalInstruction,
            "packageId": this.selectedPackage,
            "price": this.packagePrice,
            "packageType": this.packagePriceType,
            "packageDay": this.packageDay,
            "packageMeridian": this.packageMeridian
        };
        var cardDetails = {
            number: this.cardNumber,
            exp_month: this.expiryMonth,
            exp_year: this.expiryYear,
            cvc: this.cvc
        };
        this.processPayment(cardDetails, orderDetails, true, saveCard);
    };
    UserPackageSearchComponent.prototype.processPayment = function (cardDetails, orderDetails, newCard, saveCard) {
        var _this = this;
        var con = confirm('Are you Sure, you wanna make this payment?');
        if (con) {
            this.processingCard = true;
            //carddetail,orderdetail,newcard,savecard
            this.stripeServices.makePayment(cardDetails, orderDetails, newCard, saveCard)
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
    UserPackageSearchComponent.prototype.cancelPurchase = function () {
        this.cardsvisible = false;
        this.cardNumber = '';
        this.expiryMonth = '';
        this.expiryYear = '';
        this.cvc = '';
        this.cancelSelection();
    };
    UserPackageSearchComponent.prototype.ngOnInit = function () {
    };
    UserPackageSearchComponent.prototype.ngOnDestroy = function () {
    };
    UserPackageSearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'user-package-search',
            templateUrl: './user.package.search.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_1.PackageServices, router_1.ActivatedRoute, index_1.AlertService, index_1.CommunityServices, index_1.StripeServices, index_1.AuthenticationService, index_1.OrderServices])
    ], UserPackageSearchComponent);
    return UserPackageSearchComponent;
}());
exports.UserPackageSearchComponent = UserPackageSearchComponent;
//# sourceMappingURL=user.package.search.component.js.map