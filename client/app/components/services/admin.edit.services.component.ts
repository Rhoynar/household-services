import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService,ServiceServices,CommunityServices } from '../../services/index';
import { Http, Headers, Response } from '@angular/http';

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-edit-service',
  templateUrl: './admin.edit.services.component.html'

})
export class AdminEditServiceComponent implements AfterViewInit, OnInit, OnDestroy {

  loggedIn: any = false;
  public serviceId: string = '';
  availableCommunity: any = [];
  
  editServiceForm: FormGroup;
  
  public serviceDetail: any = {};
  pagetitle="Update Service";
  //constructor start
  constructor(
    private http: Http,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private serviceServices:ServiceServices,
    private communityServices: CommunityServices
  ) {
    let params: any = this.activatedRoute.snapshot.params;

    this.serviceId = params.id;
    this.editServiceForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      communityId: ['', Validators.required],
    });


  }
  //end of constructor



  //service page
  servicePage() {
    this.router.navigate(['/admin/services']);
  }

  submitForm(): void {
    
    this.serviceServices.updateService(this.editServiceForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);
          this.servicePage();
        }
        
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
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }


    this.serviceServices.getServiceByid(this.serviceId)
      .subscribe(data => {
        if (data.status == "success") {
          this.serviceDetail = data.result;
          this.editServiceForm.controls['id'].setValue(this.serviceDetail._id);
          this.editServiceForm.controls['title'].setValue(this.serviceDetail.title);
          this.editServiceForm.controls['communityId'].setValue(this.serviceDetail.communityId);
        } else {
          alert(data.msg);
        }

      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        //alert(errr.msg);
        this.alertService.error(errr.msg, 'service-error');

      }
      );

  }

  ngOnDestroy() {

  }

}