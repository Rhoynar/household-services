import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { VendorServices } from '../../services/index';

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'vendors',
  templateUrl: './vendors.component.html'

})
export class VendorComponent implements AfterViewInit, OnInit, OnDestroy {

  availableVendors: any;
  loggedIn: any = false;


  //constructor start
  constructor(
    private router: Router,
    private vendorsService: VendorServices
  ) {


  }
  //end of constructor

  //get vendors
  getAllVendors() {
    this.vendorsService.getAllVendors()
      .subscribe(data => {
        this.availableVendors = data.result;
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
    this.getAllVendors();

  }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
  }

  ngOnDestroy() {

  }

}