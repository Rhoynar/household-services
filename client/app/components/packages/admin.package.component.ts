import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot } from '@angular/router';
import { PackageServices, AlertService } from '../../services/index';



@Component({
  moduleId: module.id,
  selector: 'admin-packages',
  templateUrl: './admin.package.component.html'
  //styles: [main]
})
export class AdminPackageComponent implements AfterViewInit {
  availablePackages: any;
  loggedIn: any = false;


  //constructor start
  constructor(
    private router: Router,
    private packageService: PackageServices,
    private alertService: AlertService
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

  deletePackage(packageId: any) {
    var con = confirm("Are you sure!, You want to delete this package");
    if (con) {


      this.packageService.deletePackageByid(packageId)
        .subscribe(data => {
          if (data.status == 'success') {
            this.alertService.success(data.msg, 'packageAlert');
            this.getAllPackage();
          } else {
            this.alertService.error(data.msg, 'packageAlert');
          }
        },
        error => {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          var errr = JSON.parse(err);

          this.alertService.error(errr.msg, 'packageAlert');
        }
        );
    }
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