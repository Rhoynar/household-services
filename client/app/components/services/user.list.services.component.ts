import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { AlertService,AuthenticationService, GooglePlaceService, PackageServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'user-services-list',
  templateUrl: './user.list.services.component.html'
  //styles: [main]
})
export class UserListServicesComponent implements AfterViewInit {
  public servicesList: any;
  public loggedIn = false;
  public zipcode: any = "";
  public pagetitle: String = "Services";
  constructor(
    private packageService: PackageServices,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    let params: any = this.activatedRoute.snapshot.queryParams;

    this.zipcode = params.zip;
    if(params.zip){
      this.getPackageByZipcode();
    }else{
      this.getAllPackage();
    }

  }

  //get packages
  getAllPackage() {
    this.packageService.getAllPackage()
      .subscribe(data => {
        this.servicesList = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );
  }

  //get packages
  getPackageByZipcode() {
    this.packageService.getPackageByZipcode(this.zipcode)
      .subscribe(data => {
        this.servicesList = data.result;
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