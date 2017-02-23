import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { PackageServices, AlertService } from '../../services/index';



@Component({
  moduleId: module.id,
  selector: 'vendor-package-list',
  templateUrl: './vendor.package.list.component.html'
  //styles: [main]
})
export class VendorPackageListComponent implements AfterViewInit {
  availablePackages: any =[];
  
  pagetitle:String="Package List";

  //constructor start
  constructor(
    private router: Router,
    private packageService: PackageServices,
    private alertService: AlertService
  ) {


  }
  //end of constructor

  //get packages
  getAllPackage() {
    this.packageService.getAllPackage()
      .subscribe(data => {
        this.availablePackages = data.result;
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
  ngOnInit() {
    
  }

  ngOnDestroy() {

  }

}