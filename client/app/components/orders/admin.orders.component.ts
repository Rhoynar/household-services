import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PackageServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'orders',
  templateUrl: './admin.orders.component.html'
  //styles: [main]
})
export class AdminOrdersComponent implements AfterViewInit {
  allOrders: any = [];

  constructor(
    private router: Router,
    private packageService: PackageServices) {
    this.getAllOrders();
  }

  getAllOrders() {
    this.packageService.getAllAdminPackageOrders()
      .subscribe(data => {
        this.allOrders = data.result;
      },
      error => {
        //console.log(error);
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

