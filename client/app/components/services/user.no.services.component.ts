import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, RouterStateSnapshot, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { AlertService, AuthenticationService, GooglePlaceService, PackageServices, CommunityServices } from '../../services/index';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'user-no-services-list',
  templateUrl: './user.no.services.component.html'
  //styles: [main]
})
export class UserNoServicesComponent implements AfterViewInit {
  
  public loggedIn = false;
  public reqReceived = false;
  public zipcode: any = "";
  public addressStr: string = "";
  public pagetitle: String = "No Services";
  public notifyServiceForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private communityServices: CommunityServices,
    private googlePlace: GooglePlaceService,
  ) {
    let params: any = this.activatedRoute.snapshot.queryParams;

    var currentUserStr = localStorage.getItem('currentUser');
    var currentUser = JSON.parse(currentUserStr);

    this.zipcode = params.zip;
    if (!params.zip) {
     this.router.navigate(['/noservice']); 
    }else{
      this.getZipAddress();
    }

    this.notifyServiceForm = this.fb.group({
      zipcode: [this.zipcode, Validators.compose([Validators.required])],
      notifyEmail: ['', Validators.compose([this.customValidator.validEmail, Validators.required])],
    });

  }

  

  getZipAddress() {

    this.communityServices.getZipAddress(this.zipcode)
      .subscribe(data => {
        if (data.status == 'OK') {
          var place = data.results[0];
          this.addressStr = '';
          if (this.googlePlace.postal_code(place.address_components)) {
            this.addressStr = this.googlePlace.postal_code(place.address_components);
          }
          if (this.googlePlace.city(place.address_components)) {
            this.addressStr += ' - ' + this.googlePlace.city(place.address_components);
          }

          if (this.googlePlace.stateCode(place.address_components)) {
            this.addressStr += ', ' + this.googlePlace.stateCode(place.address_components);
          }

        } else {
          this.addressStr = "";
        }

      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        alert(errr.msg);

      }
      );

      //this.notifyServiceForm.controls['zipcode'].setValue(this.zipcode);
    
  }

  



  notifyRequest() {
    
    console.log(this.notifyServiceForm.value);
    

    this.communityServices.addServiceDemand(this.notifyServiceForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);
        } else {
          
          this.reqReceived = true;
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

    

  }

}