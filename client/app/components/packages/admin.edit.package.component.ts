import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService,PackageServices, UserServices,ServiceServices } from '../../services/index';
import { UserModel } from '../../models/models';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-edit-package',
  templateUrl: './admin.edit.package.component.html'

})
export class AdminEditPackageComponent implements AfterViewInit, OnInit, OnDestroy {

  loggedIn: any = false;
  packageId: string = '';
  availableServices:any=[];
  
  editPackageForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  packageDetails: any = {};
  availableVendors: any;
  pagetitle="Update Package";
  //constructor start
  constructor(
    private http: Http,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private userServices: UserServices,
    private packageServices: PackageServices,
    private serviceServices:ServiceServices
  ) {
    let params: any = this.activatedRoute.snapshot.params;
    this.packageId = params.id;
    this.editPackageForm = this.fb.group({
      id: ['', Validators.required],
      serviceId: ['', Validators.required],
      title: ['', Validators.required],
      postcode: ['', Validators.required],
      price: ['', Validators.required],
      frequency: ['', Validators.required],
      vendorList: this.fb.array([]),
      featureList: this.fb.array([])
    });





  }
  //end of constructor

  initFeature() {
    return this.fb.group({
      feature: ['', Validators.required]
    });
  }

  initVendor() {
    return this.fb.group({
      vendor: ['', Validators.required]
    });
  }

  addFeature() {
    var control: any = this.editPackageForm.controls['featureList'];
    control.push(this.initFeature());
  }

  addVendor() {
    var control: any = this.editPackageForm.controls['vendorList'];
    control.push(this.initVendor());
  }

  //get vendors
  packagePage() {
    this.router.navigate(['/admin/packages']);
  }

  removefeature(index: any) {
    var arrayControl: any = this.editPackageForm.controls['featureList']
    arrayControl.removeAt(index);
  }

  removeVendor(index: any) {
    var arrayControl: any = this.editPackageForm.controls['vendorList']
    arrayControl.removeAt(index);
  }

  submitForm(): void {
    //console.log('Reactive Form Data: ')
    //console.log(this.editPackageForm.value);
    

    this.packageServices.updatePackage(this.editPackageForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);
          this.packagePage();
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




  ngAfterViewInit() {


  }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }


    this.packageServices.getPackageByid(this.packageId)
      .subscribe(data => {
        if (data.status == "success") {
          this.packageDetails = data.result;
          
          this.editPackageForm.controls['id'].setValue(this.packageDetails._id);
          this.editPackageForm.controls['title'].setValue(this.packageDetails.title);
          this.editPackageForm.controls['serviceId'].setValue(this.packageDetails.serviceId._id);
          this.editPackageForm.controls['postcode'].setValue(this.packageDetails.postalcode);
          this.editPackageForm.controls['price'].setValue(this.packageDetails.price);
          this.editPackageForm.controls['frequency'].setValue(this.packageDetails.frequency);

          var control: any = this.editPackageForm.controls['featureList'];
          for (let eachFeature of this.packageDetails.features) {
            var newControl=this.initFeature();
             control.push(newControl);
             newControl.controls['feature'].setValue(eachFeature);
          }

          var vendorControl: any = this.editPackageForm.controls['vendorList'];
          for (let eachVendor of this.packageDetails.vendors) {
            var newControl=this.initVendor();
             vendorControl.push(newControl);
             newControl.controls['vendor'].setValue(eachVendor);
          }
          
          
        } else {
          alert(data.msg);
        }

      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        //alert(errr.msg);
        this.alertService.error(errr.msg, 'package-error');

      }
      );



      this.getActiveVendors();
      this.getAllServices();

  }

  //get vendors
  getActiveVendors() {
    //this.userServices.getUserByRole('vendor')
    this.userServices.getVendorByStatus(1)
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

  //get services
  getAllServices() {
    this.serviceServices.getAllService()
      .subscribe(data => {
        this.availableServices = data.result;
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