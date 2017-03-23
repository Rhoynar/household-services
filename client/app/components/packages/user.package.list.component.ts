import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { StripeServices, PackageServices, AlertService, OrderServices } from '../../services/index';
import { IMyOptions, IMyDate, IMyDateModel } from 'mydatepicker';


import * as moment from 'moment';


@Component({
  moduleId: module.id,
  selector: 'user-package-list',
  templateUrl: './user.package.list.component.html'
  //styles: [main]
})
export class UserPackageListComponent implements AfterViewInit {
  public availablePackages: any = [];
  public userCreditCards: any = [];
  public pagetitle: String = "Package List";
  public zipcode: any = "";
  public selectedPackage:any={};
  public selectedPackageId: String = "";
  public preferedDate: any = "";
  public preferedType: any = "";
  public additionalInstruction: any = "";
  private selDate: IMyDate = { year: 0, month: 0, day: 0 };
  private cardsvisible = false;
  private useCardId: any = '';
  private processingCard: any = false;
  private cardNumber: any = '';
  private expiryMonth: any = '';
  private expiryYear: any = '';
  private cvc: any = '';
  private packagePrice = '';
  private packageDay = '';
  private packageMeridian = '';
  private packagePriceType="";


  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
    editableDateField: false,
    openSelectorOnInputClick: true,
    disableUntil: { year: 0, month: 0, day: 0 }
  };

  
  
  onDateChanged(event: IMyDateModel) {
    // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  //constructor start
  constructor(
    private router: Router,
    private packageService: PackageServices,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private stripeServices: StripeServices,
    private orderServices: OrderServices
  ) {
    let d: Date = new Date();
    this.selDate = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    };

    this.myDatePickerOptions.disableUntil = {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate() - 1
    }

    let params: any = this.activatedRoute.snapshot.queryParams;

    this.zipcode = params.zip;
    this.getAllPackage();

  }
  //end of constructor


  selectPackage(index:number){
       this.selectedPackage= this.availablePackages[index];
  }
  //get packages
  getAllPackage() {
    this.packageService.getAllPackage()
      .subscribe(data => {
        this.availablePackages = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
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

  setPriceDetails(price: any, day: any, meridian: any) {
    this.packagePrice = price;
    this.packageDay = day;
    this.packageMeridian = meridian;
    //this.myDatePickerOptions.enableDays = [];
    let d: Date = new Date();
    var currDay = d.getDay()
    var selDayCount = this.getWeekDayCount(day);

    if (selDayCount - currDay == 0) {
      this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
    } else if ((currDay - selDayCount) > 0) {
      this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() + (7 - (currDay - selDayCount))
      };
    } else if ((selDayCount - currDay) > 0) {
      this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate() + (selDayCount - currDay)
      };
    }
    this.preferedDate = this.selDate;

  }

  cancelSelection() {
    this.selectedPackageId = "";
    this.preferedDate = "";
    this.preferedType = "";
    this.selectedPackage={};
    this.additionalInstruction = "";
    this.packagePrice = "";
    this.packageDay = "";
    this.packageMeridian = "";
    this.packagePriceType="";
  }

  cancelPurchase() {
    this.cardsvisible = false;
    this.cardNumber='';
    this.expiryMonth='';
    this.expiryYear='';
    this.cvc='';
    this.cancelSelection();
  }

  submitForm(form: any): void {

    if (this.preferedType != '' && this.preferedDate.epoc > 0) {
      var orderDetails = {
        "serviceDate": this.preferedDate.date,
        "serviceType": this.preferedType,
        "instruction": this.additionalInstruction,
        "packageId": this.selectedPackageId
      };
      this.cardsvisible = true;

      /* this.orderServices.createOrder(orderDetails).subscribe(data => {
 
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

  makePayment(cardDetails: any) {

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
      this.stripeServices.makePayment(cardDetails, orderDetails,false,false)
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


  payWithNewCard(saveCard:any) {
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
      this.stripeServices.makePayment(cardDetails, orderDetails,true,saveCard)
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

  ngAfterViewInit() {
    //this.getAllPackage();
    this.getCards();
  }
  ngOnInit() {

  }

  ngOnDestroy() {

  }

}