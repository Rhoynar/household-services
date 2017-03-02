import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OrderServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'vendor-dashboard',
  templateUrl: './vendor.dashboard.component.html'
  //styles: [main]
})
export class VendorDashboardComponent implements AfterViewInit {

  public pagetitle: any = "Dashboard";
  public orderList: any = [];
  constructor(private orderServices: OrderServices) {

    this.getUpcomingVendorOrders();
  }

  getUpcomingVendorOrders() {
    this.orderServices.upcomingVendorOrder()
      .subscribe(data => {
        this.orderList = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }

  ngAfterViewInit() {


  }

}