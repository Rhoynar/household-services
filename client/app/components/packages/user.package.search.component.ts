import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { PackageServices, AlertService, OrderServices } from '../../services/index';
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
  public preferedType: any = "";
  public additionalInstruction: any = "";
  private selDate: IMyDate = { year: 0, month: 0, day: 0 };
  private packageCalender = {};
  private packagePriceType = '';
  private packagePrice = '';
  private packageDay = '';
  private packageMeridian = '';



  private myDatePickerOptions: IMyOptions = {
    // other options...
    dateFormat: 'dd-mm-yyyy',
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
    private orderServices: OrderServices
  ) {
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
    console.log("sele"+selDayCount+"-cuur"+currDay);
    if (selDayCount-currDay == 0) {
      this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()
      };
    }else if ((currDay-selDayCount) > 0 ) {
      this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()+(7-(currDay-selDayCount))
      };
    }else if((selDayCount-currDay) > 0 ) {
      this.selDate = {
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate()+(selDayCount-currDay)
      };
    }
    this.preferedDate =this.selDate;

  }
  //get packages
  getPackageByZipcode() {
    this.packageService.getPackageByZipcode(this.zipcode)
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
  }

  setSelectedPackageDetail(i: any) {

    this.packageCalender = this.availablePackages[i];

  }

  cancelSelection() {
    this.selectedPackage = "";
    this.preferedDate = "";
    this.preferedType = "";
    this.additionalInstruction = "";
    this.packagePriceType = "";
    this.packagePrice = "";
    this.packageDay = "";
    this.packageMeridian = "";
    this.packageCalender = {};
  }

  submitForm(form: any): void {

    if (this.preferedType != '' && this.preferedDate.epoc > 0) {
      var orderDetails = {
        "serviceDate": this.preferedDate.date,
        "serviceType": this.preferedType,
        "instruction": this.additionalInstruction,
        "packageId": this.selectedPackage
      };
      this.orderServices.createOrder(orderDetails).subscribe(data => {

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
      );
    } else {

      this.alertService.error("Please complete form", 'additional-form');
    }

  }

  ngAfterViewInit() {
    //this.getAllPackage();

  }
  ngOnInit() {

  }

  ngOnDestroy() {

  }

}