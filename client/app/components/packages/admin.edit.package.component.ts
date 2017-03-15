import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, PackageServices, CommunityServices, UserServices, ServiceServices } from '../../services/index';
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
  availableServices: any = [];
  availableCommunity: any = [];
  editPackageForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  packageDetails: any = {};
  availableVendors: any;
  pagetitle = "Update Package";
  //constructor start
  constructor(
    private http: Http,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private userServices: UserServices,
    private packageServices: PackageServices,
    private serviceServices: ServiceServices,
    private communityServices: CommunityServices
  ) {
    let params: any = this.activatedRoute.snapshot.params;
    this.packageId = params.id;
    this.editPackageForm = this.fb.group({
      id: ['', Validators.required],
      serviceId: ['', Validators.required],
      //communityId: ['', Validators.required],
      title: ['', Validators.required],
      postcode: ['', Validators.required],
      price: ['', Validators.required],
      mon_mor_price: [0, Validators.required],
      mon_noon_price: [0, Validators.required],
      mon_eve_price: [0, Validators.required],
      tue_mor_price: [0, Validators.required],
      tue_noon_price: [0, Validators.required],
      tue_eve_price: [0, Validators.required],
      wed_mor_price: [0, Validators.required],
      wed_noon_price: [0, Validators.required],
      wed_eve_price: [0, Validators.required],
      thur_mor_price: [0, Validators.required],
      thur_noon_price: [0, Validators.required],
      thur_eve_price: [0, Validators.required],
      fri_mor_price: [0, Validators.required],
      fri_noon_price: [0, Validators.required],
      fri_eve_price: [0, Validators.required],
      sat_mor_price: [0, Validators.required],
      sat_noon_price: [0, Validators.required],
      sat_eve_price: [0, Validators.required],
      sun_mor_price: [0, Validators.required],
      sun_noon_price: [0, Validators.required],
      sun_eve_price: [0, Validators.required],
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
          //this.editPackageForm.controls['communityId'].setValue(this.packageDetails.communityId);
          this.editPackageForm.controls['serviceId'].setValue(this.packageDetails.serviceId._id);
          this.editPackageForm.controls['postcode'].setValue(this.packageDetails.postalcode);
          this.editPackageForm.controls['price'].setValue(this.packageDetails.price);
          this.editPackageForm.controls['frequency'].setValue(this.packageDetails.frequency);
          this.editPackageForm.controls['mon_mor_price'].setValue(this.packageDetails.mon_mor_price);
          this.editPackageForm.controls['mon_noon_price'].setValue(this.packageDetails.mon_noon_price);
          this.editPackageForm.controls['mon_eve_price'].setValue(this.packageDetails.mon_eve_price);
          this.editPackageForm.controls['tue_mor_price'].setValue(this.packageDetails.tue_mor_price);
          this.editPackageForm.controls['tue_noon_price'].setValue(this.packageDetails.tue_noon_price);
          this.editPackageForm.controls['tue_eve_price'].setValue(this.packageDetails.tue_eve_price);
          this.editPackageForm.controls['wed_mor_price'].setValue(this.packageDetails.wed_mor_price);
          this.editPackageForm.controls['wed_noon_price'].setValue(this.packageDetails.wed_noon_price);
          this.editPackageForm.controls['wed_eve_price'].setValue(this.packageDetails.wed_eve_price);
          this.editPackageForm.controls['thur_mor_price'].setValue(this.packageDetails.thur_mor_price);
          this.editPackageForm.controls['thur_noon_price'].setValue(this.packageDetails.thur_noon_price);
          this.editPackageForm.controls['thur_eve_price'].setValue(this.packageDetails.thur_eve_price);
          this.editPackageForm.controls['fri_mor_price'].setValue(this.packageDetails.fri_mor_price);
          this.editPackageForm.controls['fri_noon_price'].setValue(this.packageDetails.fri_noon_price);
          this.editPackageForm.controls['fri_eve_price'].setValue(this.packageDetails.fri_eve_price);
          this.editPackageForm.controls['sat_mor_price'].setValue(this.packageDetails.sat_mor_price);
          this.editPackageForm.controls['sat_noon_price'].setValue(this.packageDetails.sat_noon_price);
          this.editPackageForm.controls['sat_eve_price'].setValue(this.packageDetails.sat_eve_price);
          this.editPackageForm.controls['sun_mor_price'].setValue(this.packageDetails.sun_mor_price);
          this.editPackageForm.controls['sun_noon_price'].setValue(this.packageDetails.sun_noon_price);
          this.editPackageForm.controls['sun_eve_price'].setValue(this.packageDetails.sun_eve_price);
          

          var control: any = this.editPackageForm.controls['featureList'];
          for (let eachFeature of this.packageDetails.features) {
            var newControl = this.initFeature();
            control.push(newControl);
            newControl.controls['feature'].setValue(eachFeature);
          }

          var vendorControl: any = this.editPackageForm.controls['vendorList'];
          for (let eachVendor of this.packageDetails.vendors) {
            var newControl = this.initVendor();
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
    this.getAllCommunities();

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