import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AlertService, ServiceServices } from '../../services/index';

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-list-services',
  templateUrl: './admin.list.services.component.html'

})
export class AdminListServiceComponent implements AfterViewInit, OnInit, OnDestroy {

  public serviceList: any;
  loggedIn: any = false;
  pagetitle = "Service List";


  //constructor start
  constructor(
    private router: Router,
    private serviceServices: ServiceServices,
    private alertService: AlertService
  ) {


  }
  //end of constructor

  //get vendors
  getAllService() {
    this.serviceServices.getAllService()
      .subscribe(data => {
        this.serviceList = data.result;
      },
      error => {
        if (error.status == '401') {
          this.router.navigate(['/admin']);
        }
      }
      );
  }


  deleteService(serviceId: any) {
    var con = confirm("Are you sure!, You want to delete this Service");
    if (con) {


      this.serviceServices.deleteService(serviceId)
        .subscribe(data => {
          if (data.status == 'success') {
            this.alertService.success(data.msg, 'serviceAlert');
            this.getAllService();
          } else {
            this.alertService.error(data.msg, 'serviceAlert');
          }
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);

          this.alertService.error(errr.msg, 'serviceAlert');
          if (error.status == '401') {
            this.router.navigate(['/admin']);
          }
        }
        );
    }
  }




  ngAfterViewInit() {
    this.getAllService();

  }
  ngOnInit() {
    var currentUserStr = localStorage.getItem('currentUser')
    var currentUser = JSON.parse(currentUserStr);
    if (currentUserStr && currentUser.token.role == "admin") {
      // logged in so return true
      this.loggedIn = true;
    }else{
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {

  }

}