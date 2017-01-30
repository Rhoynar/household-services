import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CommunityServices, StripeServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'deals',
  templateUrl: './deals.component.html'
  //styles: [main]
})
export class DealsComponent implements AfterViewInit {
  myDeals:any=[];

  constructor(
    private router: Router,
    private communityService: CommunityServices) {
      this.getMyDeals();
  }

  getMyDeals(){
    this.communityService.getMyServices()
      .subscribe(data => {
        this.myDeals = data.result;

        //this.router.navigate(['/login']);
        //return false;
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

    $(document).ready(function () {

      //$(".s-box").selectbox();
    });
  }

}