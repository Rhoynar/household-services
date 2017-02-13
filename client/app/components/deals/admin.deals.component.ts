import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PackageServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'deals',
  templateUrl: './admin.deals.component.html'
  //styles: [main]
})
export class AdminDealsComponent implements AfterViewInit {
  allDeals: any = [];

  constructor(
    private router: Router,
    private packageService: PackageServices) {
    this.getAllDeals();
  }

  getAllDeals() {
    this.packageService.getAllAdminPackageDeals()
      .subscribe(data => {
        this.allDeals = data.result;
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