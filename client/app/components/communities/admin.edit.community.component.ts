import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, CommunityServices } from '../../services/index';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-edit-community',
  templateUrl: './admin.edit.community.component.html'

})
export class AdminEditCommunityComponent implements AfterViewInit, OnInit, OnDestroy {

  loggedIn: any = false;
  communityId: string = '';
  filesToUpload: Array<File> = [];
  public formData: FormData = new FormData();
  editCommunityForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  communityDetails: any = {};
  availableVendors: any;
  pagetitle = "Update Package";
  //constructor start
  constructor(
    private http: Http,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private communityServices: CommunityServices

  ) {
    let params: any = this.activatedRoute.snapshot.params;
    this.communityId = params.id;
    this.editCommunityForm = this.fb.group({
      id: ['', Validators.required],
      title: ['', Validators.required],
      addressLineOne: ['', Validators.required],
      addressLineTwo: [''],
      postcode: ['', Validators.required],
      phone: ['', Validators.required],
      communityLogo: ['']
    });





  }
  //end of constructor


  communityPage() {

    this.router.navigate(['/admin/community']);
  }


  submitForm(): void {

    console.log(this.formData);
    console.log(this.editCommunityForm.value);

    
    this.formData.append('id',this.editCommunityForm.value.id);
    this.formData.append('title',this.editCommunityForm.value.title);
    this.formData.append('addressLineOne',this.editCommunityForm.value.addressLineOne);
    this.formData.append('addressLineTwo',this.editCommunityForm.value.addressLineTwo);
    this.formData.append('postcode',this.editCommunityForm.value.postcode);
    this.formData.append('phone',this.editCommunityForm.value.phone);
    this.communityServices.updateCommunity(this.editCommunityForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);
          this.communityPage();
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

  fileChangeEvent(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.formData.append('communityLogo', file, file.name);
      console.log(this.formData);
    }
  }

  // fileChangeEvent(fileInput: any) {
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  // }

  ngAfterViewInit() {


  }
  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }


    this.communityServices.getCommunityByid(this.communityId)
      .subscribe(data => {
        if (data.status == "success") {
          this.communityDetails = data.result;

          this.editCommunityForm.controls['id'].setValue(this.communityDetails._id);
          this.editCommunityForm.controls['title'].setValue(this.communityDetails.title);
          this.editCommunityForm.controls['addressLineOne'].setValue(this.communityDetails.addressLineOne);
          this.editCommunityForm.controls['addressLineTwo'].setValue(this.communityDetails.addressLineTwo);
          this.editCommunityForm.controls['postcode'].setValue(this.communityDetails.postcode);
          this.editCommunityForm.controls['phone'].setValue(this.communityDetails.phone);

        } else {

          this.alertService.error(data.msg, 'community-error');
        }

      },
      error => {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        var errr = JSON.parse(err);
        //alert(errr.msg);
        this.alertService.error(errr.msg, 'community-error');

      }
      );

  }





  ngOnDestroy() {

  }

}