import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import { PackageServices,VendorServices } from '../../services/index';
import { VendorModel } from '../../models/vendor.model';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-add-package',
  templateUrl: './admin.add.package.component.html'

})
export class AdminAddPackageComponent implements AfterViewInit, OnInit, OnDestroy {

  availableVendors: any;
  loggedIn: any = false;

  vendorModel = new VendorModel(); 
  addPackageForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  
  //constructor start
  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private packageServices: PackageServices,
    private vendorsService: VendorServices
  ) {
    
    this.addPackageForm = this.fb.group({
          title: ['', Validators.required],
          postcode: ['', Validators.required],
          price: ['', Validators.required],
          frequency: ['', Validators.required],
          vendorList:this.fb.array([this.initVendor()]),
          featureList: this.fb.array([this.initFeature()])
        });
   console.log(this.addPackageForm);
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
        var control :any= this.addPackageForm.controls['featureList'];
        control.push(this.initFeature());
        console.log(this.addPackageForm.controls['featureList']);
    }

    addVendor() {
    var control: any = this.addPackageForm.controls['vendorList'];
    control.push(this.initVendor());
  }

  //get vendors
  packagePage() {
    console.log(this.addPackageForm.controls['featureList']);     
    this.router.navigate(['/admin/packages']);
  }

  removefeature(index:any){
    var arrayControl:any=this.addPackageForm.controls['featureList']
    arrayControl.removeAt(index);
  }

  removeVendor(index: any) {
    var arrayControl: any = this.addPackageForm.controls['vendorList']
    arrayControl.removeAt(index);
  }

  submitForm(): void {
    //console.log('Reactive Form Data: ')
    //console.log(this.profileUpdateForm.value);
    console.log(this.addPackageForm.value);
    
    this.packageServices.addPackage(this.addPackageForm.value)
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
    this.getAllVendors();

  }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
  }

  //get vendors
  getAllVendors() {
    this.vendorsService.getAllVendors()
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

  ngOnDestroy() {

  }

}