import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { AuthenticationService,StripeServices, PackageServices, AlertService, OrderServices, CommunityServices } from '../../services/index';
import { IMyOptions, IMyDate, IMyDateModel, IMyInputFieldChanged } from 'mydatepicker';


import * as moment from 'moment';


@Component({
  moduleId: module.id,
  selector: 'user-package-search',
  templateUrl: './user.package.search.component.html'
  //styles: [main]
})
export class UserPackageSearchComponent implements AfterViewInit {
  availablePackages: any = [];

  public pagetitle: String = "Package List";
  public zipcode: any = "";
  public selectedPackage: String = "";
  public preferedDate: any = "";

  public additionalInstruction: any = "";
  private selDate: IMyDate = { year: 0, month: 0, day: 0 };
  private packageCalender: any = {};
  private packagePriceType = '';
  private packagePrice = '';
  private packageDay = '';
  private packageMeridian = '';
  public userCreditCards: any = [];

  private cardsvisible = false;
  private useCardId: any = '';
  private processingCard: any = false;
  private cardNumber: any = '';
  private expiryMonth: any = '';
  private expiryYear: any = '';
  private cvc: any = '';
  public loggedIn: any=false;;

  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'mm-dd-yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableUntil: { year: 0, month: 0, day: 0 }
    //disableUntil: { year: 9999, month: 12, day: 31 }
  };




  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    //console.log()
  }

  createEnabledDays(startEventNumber: number, lastEventNumber: number, eventYear: number, eventMonth: number) {
    console.log(startEventNumber + "," + lastEventNumber + "," + eventYear + "," + eventMonth);
    var enableDays = this.myDatePickerOptions.enableDays;
    while (startEventNumber <= lastEventNumber) {
      enableDays.push({ year: eventYear, month: eventMonth, day: startEventNumber });
      startEventNumber = startEventNumber + 7;
    }
    //this.myDatePickerOptions.enableDays= [{ year:2017,  month:3,  day:1},{ year:2017,  month:3,  day:8}];
  }

  getWeekDayCount(weekDay: String) {
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
  }
  onCalendarViewChanged(event: any) {
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

  }

  //constructor start
  constructor(
    private router: Router,
    private packageService: PackageServices,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private communityServices: CommunityServices,
    private stripeServices: StripeServices,
    private authenticationService: AuthenticationService,
    private orderServices: OrderServices
  ) {



    this.authenticationService.generatetoken()
      .subscribe(result => {
        var currentUserStr = localStorage.getItem('currentUser');
        var currentUser = JSON.parse(currentUserStr);
        if (currentUserStr) { //if user is there
          if (currentUser.token.role == "user") {  //if current user is admin
            this.loggedIn = true;
          }
        } else {
          this.loggedIn = false;
          // if(this.router.url!='/'){
          //   this.router.navigate(['/login']);
          // }
          
          
        }
      });


    let d: Date = new Date();
    // this.selDate = {
    //   year: d.getFullYear(),
    //   month: d.getMonth() + 1,
    //   day: d.getDate()
    // };

    this.myDatePickerOptions.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate() - 1
    }

    let params: any = this.activatedRoute.snapshot.queryParams;

    var currentUserStr = localStorage.getItem('currentUser');
    var currentUser = JSON.parse(currentUserStr);


    if (params.zip) {
      this.zipcode = params.zip;
    } else if (currentUserStr) {
      this.zipcode = currentUser.token.zipcode;
    }



    this.getPackageByZipcode();

    if (params.id) {
      this.selectedPackage = params.id;
    }

    if (params.priceType) {
      this.packagePriceType = params.priceType;
      //this.packageCalender
    }

  }
  //end of constructor

  setPriceDetails(price: any, day: any, meridian: any) {
    this.packagePrice = price;
    this.packageDay = day;
    this.packageMeridian = meridian;
    //this.myDatePickerOptions.enableDays = [];
    let d: Date = new Date();
    var currDay = d.getDay()
    var selDayCount = this.getWeekDayCount(day);
    var numberOfDaysToAdd=0;
    if (selDayCount - currDay == 0) {
      
      numberOfDaysToAdd=0;
      
    } else if ((currDay - selDayCount) > 0) {
      
      numberOfDaysToAdd=7 - (currDay - selDayCount);
    } else if ((selDayCount - currDay) > 0) {
      numberOfDaysToAdd=selDayCount - currDay;
    }
    d.setDate(d.getDate() + numberOfDaysToAdd); 
    this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
    this.preferedDate = this.selDate;

  }
  //get packages
  getPackageByZipcode() {
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

      this.packageService.getAllPackage()
      .subscribe(data => {
        this.availablePackages = data.result;
        this.getSelectedPackageDetail();
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }

  getSelectedPackageDetail() {
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
      this.setPriceDetails(eval("this.packageCalender." + this.packagePriceType), priceTypeArr[0], priceTypeArr[1])

    }



  }

  setSelectedPackageDetail(i: any) {

    this.packageCalender = this.availablePackages[i];
    console.log(this.packageCalender);
  }

  cancelSelection() {
    this.selectedPackage = "";
    this.preferedDate = "";

    this.additionalInstruction = "";
    this.packagePriceType = "";
    this.packagePrice = "";
    this.packageDay = "";
    this.packageMeridian = "";
    this.packageCalender = {};
  }

  submitForm(form: any): void {

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
      /*this.orderServices.createOrder(orderDetails).subscribe(data => {

        this.alertService.success(data.msg, 'additional-form');
        this.router.navigate(['/dashboard']);
        //return false;
      },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);
          this.alertService.error(errr.msg, 'additional-form');
        }
      );*/
    } else {

      this.alertService.error("Please complete form", 'additional-form');
    }

  }


  //get users credit cards
  getCards() {
    this.stripeServices.getCards()
      .subscribe(data => {
        //this.stripeCustomerId = data.stripe_cus_id;
        this.userCreditCards = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);
        if (error.status) {
          this.router.navigate(['/login']);
        }
      }
      );
  }

  ngAfterViewInit() {
    //this.getAllPackage();
    this.getCards();
  }



  makePayment(cardDetails: any) {

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

  }


  payWithNewCard(saveCard: any) {
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


  }

  processPayment(cardDetails: any, orderDetails: any, newCard: any, saveCard: any) {
    var con = confirm('Are you Sure, you wanna make this payment?');
    if (con) {
      this.processingCard = true;
      //carddetail,orderdetail,newcard,savecard
      this.stripeServices.makePayment(cardDetails, orderDetails, newCard, saveCard)
        .subscribe(data => {

          this.processingCard = false;
          this.router.navigate(['/order']);
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);
          //alert(errr.msg);
          this.alertService.error(errr.msg, 'card-error');
          if (error.status) {
            this.router.navigate(['/login']);
          }
        }
        );
    }
  }

  cancelPurchase() {
    this.cardsvisible = false;
    this.cardNumber = '';
    this.expiryMonth = '';
    this.expiryYear = '';
    this.cvc = '';
    this.cancelSelection();
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

}