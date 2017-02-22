import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { PackageServices, AlertService, OrderServices } from '../../services/index';
import { IMyOptions, IMyDate, IMyDateModel } from 'mydatepicker';


import * as moment from 'moment';


@Component({
  moduleId: module.id,
  selector: 'user-package-search',
  templateUrl: './user.package.search.component.html'
  //styles: [main]
})
export class UserPackageSearchComponent implements AfterViewInit {
  availablePackages: any = [];

  pagetitle: String = "Package List";
  public zipcode: any = "";
  public selectedPackage: String = "";
  public preferedDate: any = "";
  public preferedType: any = "";
  public additionalInstruction: any = "";
  private selDate: IMyDate = { year: 0, month: 0, day: 0 };

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
    this.getPackageByZipcode();

  }
  //end of constructor

  //get packages
  getPackageByZipcode() {
    this.packageService.getPackageByZipcode(this.zipcode)
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

  cancelSelection() {
    this.selectedPackage = "";
    this.preferedDate = "";
    this.preferedType = "";
    this.additionalInstruction = "";
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