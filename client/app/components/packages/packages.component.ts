import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, GooglePlaceService, PackageServices } from '../../services/index';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'packages',
  templateUrl: './packages.component.html'
  //styles: [main]
})
export class PackagesComponent implements AfterViewInit {
  packages: any;
  loggedIn = false;

  constructor(
    private packageService: PackageServices,
    private authenticationService: AuthenticationService
  ) {
    

  }

  getAllPackage() {
    this.packageService.getAllPackage()
      .subscribe(data => {
        this.packages = data.result;
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
    this.getAllPackage();

  }

}