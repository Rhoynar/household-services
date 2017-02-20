import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'vendor-dashboard',
  templateUrl: './vendor.dashboard.component.html'
  //styles: [main]
})
export class VendorDashboardComponent implements AfterViewInit {

  public pagetitle: any = "Dashboard";
  constructor() {


  }

  ngAfterViewInit() {


  }

}