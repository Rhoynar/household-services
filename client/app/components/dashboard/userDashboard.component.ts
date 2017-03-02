import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AlertService, AuthenticationService, OrderServices } from '../../services/index';


@Component({
  moduleId: module.id,
  selector: 'user-dashboard',
  templateUrl: './userDashboard.component.html'
  //styles: [main]
})
export class UserDashboardComponent {

  public pagetitle: String = 'Dashboard';
  public userOrders: any = [];
  constructor(
    private alertService: AlertService,
    private orderServices: OrderServices,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.getUserOrder();
  }

  //get packages
  getUserOrder() {
    this.orderServices.getUpcomingUserOrder()
      .subscribe(data => {
        this.userOrders = data.result;
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