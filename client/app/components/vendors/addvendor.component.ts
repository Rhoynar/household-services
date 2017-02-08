import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import { VendorServices } from '../../services/index';
import { VendorModel } from '../../models/vendor.model';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'add-vendor',
  templateUrl: './addvendor.component.html'

})
export class AddVendorComponent implements AfterViewInit, OnInit, OnDestroy {

  availableVendors: any;
  loggedIn: any = false;

  vendorModel = new VendorModel(); 
  addVendorForm: FormGroup;
  customValidator = new CustomValidator(this.http);

  //constructor start
  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private vendorService: VendorServices
  ) {

    this.addVendorForm = this.fb.group({
          // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
          vendorName: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
          vendorphone: '',
          addresslineone: ['', Validators.required],
          vendorEmail: ['', Validators.compose([this.customValidator.validEmail, Validators.required])],
          addresslinetwo: '',
          vendorcity:  '',
          vendorcountry:  '',
          vendorzip:  ['', Validators.required],
        });
        
  }
  //end of constructor

  //get vendors
  vendorPage() {
    this.router.navigate(['/admin/vendors']);
  }



  submitForm(): void {
    //console.log('Reactive Form Data: ')
    //console.log(this.profileUpdateForm.value);
    this.vendorService.addvendors(this.addVendorForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);
          this.vendorPage();
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
  }

  ngOnDestroy() {

  }

}