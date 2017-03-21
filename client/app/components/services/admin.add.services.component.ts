import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ServiceServices,CommunityServices,PackageServices } from '../../services/index';
import { UserModel } from '../../models/models';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-add-service',
  templateUrl: './admin.add.services.component.html'

})
export class AdminAddServiceComponent implements AfterViewInit, OnInit, OnDestroy {

  public serviceDetail: any;
  loggedIn: any = false;
  availableCommunity: any = [];
  addServiceForm: FormGroup;
  monthlyPackages: any = [];
  dailyPackages: any = [];
  customValidator = new CustomValidator(this.http);
  pagetitle = "New Service";
  //constructor start
  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private serviceServices: ServiceServices,
    private communityServices: CommunityServices,
    private packageServices: PackageServices

  ) {

    this.addServiceForm = this.fb.group({
      title: ['', Validators.required],
      dailyPackageId: ['', Validators.required],
      monthlyPackageId: ['', Validators.required]
      //communityId: ['', Validators.required],
    });
    console.log(this.addServiceForm);
  }
  //end of constructor

  //service page
  servicePage() {
    this.router.navigate(['/admin/services']);
  }

  submitForm(): void {

    

    this.serviceServices.addService(this.addServiceForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);
          this.servicePage();
        }

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


  getAllCommunities() {
    this.communityServices.getAllCommunity()
      .subscribe(data => {
        this.availableCommunity = data.result;
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
    this.getAllCommunities();
  }
  
  ngOnInit() {
    var currentUserStr = localStorage.getItem('currentUser')
    var currentUser = JSON.parse(currentUserStr);
    if (currentUserStr && currentUser.token.role == "admin") {
      // logged in so return true
      this.loggedIn = true;
    } else {
      this.router.navigate(['/']);
    }


    this.packageServices.getPackageByType('monthly')
      .subscribe(data => {
        this.monthlyPackages = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );

    this.packageServices.getPackageByType('daily')
      .subscribe(data => {
        this.dailyPackages = data.result;
      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );


  }

  ngOnDestroy() {

  }

}