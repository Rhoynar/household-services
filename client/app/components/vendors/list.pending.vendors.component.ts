import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { UserServices,AlertService } from '../../services/index';

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'list-pending-vendors',
  templateUrl: './list.pending.vendors.component.html'

})
export class ListPendingVendorComponent implements AfterViewInit, OnInit, OnDestroy {

  availableVendors: any;
  loggedIn: any = false;
  pagetitle="Pending Vendor List";


  //constructor start
  constructor(
    private router: Router,
    private userServices: UserServices,
    private alertService: AlertService
  ) {


  }
  //end of constructor

  //get vendors
  getPendingVendors() {
    //this.userServices.getUserByRole('vendor')
    this.userServices.getVendorByStatus(0)
      .subscribe(data => {
        this.availableVendors = data.result;
      },
      error => {
        if(error.status=='401'){
          this.router.navigate(['/admin']);
        }
        

      }
      );
  }

  approveVendor(vendorId: any) {
    var con = confirm("Are you sure!, You want to approve this vendor");
    if (con) {


      this.userServices.approveVendor({vendorId:vendorId})
        .subscribe(data => {
          if (data.status == 'success') {
            this.alertService.success(data.msg, 'vendorAlert');
            this.getPendingVendors();
          } else {
            this.alertService.error(data.msg, 'vendorAlert');
          }
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);

          this.alertService.error(errr.msg, 'vendorAlert');
        }
        );
    }
  }


deleteVendor(vendorId: any) {
    var con = confirm("Are you sure!, You want to delete this vendor");
    if (con) {


      this.userServices.deleteUser(vendorId)
        .subscribe(data => {
          if (data.status == 'success') {
            this.alertService.success(data.msg, 'vendorAlert');
            this.getPendingVendors();
          } else {
            this.alertService.error(data.msg, 'vendorAlert');
          }
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);

          this.alertService.error(errr.msg, 'vendorAlert');
        }
        );
    }
  }




  ngAfterViewInit() {
    this.getPendingVendors();

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