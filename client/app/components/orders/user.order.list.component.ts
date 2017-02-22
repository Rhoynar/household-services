import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { AlertService,AuthenticationService,OrderServices } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'user-order',
  templateUrl: './user.order.list.component.html'
  //styles: [main]
})
export class UserOrderListComponent {

  public userOrders: any = [];
  public pagetitle:String='Orders';
  constructor(
    
    private alertService: AlertService,
    private orderServices: OrderServices,
    private router: Router
  ) {
    this.getUserOrder();
  }

//get packages
  getUserOrder() {
    this.orderServices.getUserOrder()
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