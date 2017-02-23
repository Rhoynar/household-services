import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AlertService,AuthenticationService,OrderServices } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'vendor-order-list',
  templateUrl: './vendor.order.list.component.html'
  //styles: [main]
})
export class VendorOrderListComponent {

  public orderList: any = [];
  public pagetitle:String='Orders List';
  constructor(
    private alertService: AlertService,
    private orderServices: OrderServices,
    private router: Router
  ) {
    this.getAllOrder();
  }

//get packages
  getAllOrder() {
    this.orderServices.getvendorOrder()
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
  

}