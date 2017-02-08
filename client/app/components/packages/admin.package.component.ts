import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { PackageServices } from '../../services/index';



@Component({
  moduleId:module.id,
  selector: 'admin-packages',
  templateUrl:'./admin.package.component.html'
  //styles: [main]
})
export class AdminPackageComponent implements AfterViewInit {
  availablePackages: any;
  loggedIn: any = false;


  //constructor start
  constructor(
    private router: Router,
    private packageService: PackageServices
  ) {


  }
  //end of constructor

  //get vendors
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
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
  }

  ngOnDestroy() {

  }

}