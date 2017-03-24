import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlertService, CommunityServices, ServiceServices } from '../../services/index';
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
  availableServices: any = [];
  filesToUpload: Array<File> = [];
  public formData: FormData = new FormData();
  editCommunityForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  communityDetails: any = {};
  availableVendors: any;
  pagetitle = "Update Community";

  //constructor start
  constructor(
    private http: Http,
    private router: Router,
    private fb: FormBuilder,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private serviceServices: ServiceServices,
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
      serviceList: this.fb.array([]),
      communityLogo: [''],
      commLogo: ['']
    });

  }
  //end of constructor

  initService() {
    return this.fb.group({
      service: ['', Validators.required]
    });
  }

  addService() {
    var control: any = this.editCommunityForm.controls['serviceList'];
    control.push(this.initService());
  }

  removeService(index: any) {
    var arrayControl: any = this.editCommunityForm.controls['serviceList']
    arrayControl.removeAt(index);
  }

  communityPage() {

    this.router.navigate(['/admin/community']);
  }


  submitForm(): void {
    this.formData.append('id', this.editCommunityForm.value.id);
    this.formData.append('title', this.editCommunityForm.value.title);
    this.formData.append('addressLineOne', this.editCommunityForm.value.addressLineOne);
    this.formData.append('addressLineTwo', this.editCommunityForm.value.addressLineTwo);
    this.formData.append('postcode', this.editCommunityForm.value.postcode);
    this.formData.append('phone', this.editCommunityForm.value.phone);
    //this.formData.append('commLogo', this.editCommunityForm.value.phone);

    this.communityServices.updateCommunity(this.editCommunityForm.value)
      //this.communityServices.updateCommunity(this.formData)
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

  fileChangeEvent1(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];

      this.formData.append('communityLogo', file, file.name);
      console.log(this.formData);
    }
  }

  fileChangeEvent12(event: any) {

    var files = event.target.files;
    var file = files[0];

    var reader = new FileReader();
    reader.onload = function (readerEvt: any) {
      //this.commLogo = readerEvt.target.result;
      //this.editCommunityForm.controls['communityLogo'].setValue(readerEvt.target.result);          
    };
    reader.readAsBinaryString(file);
  }

  fileChangeEvent(event: any) {
    this.readImage(event, this.setAvatar, this);
  }

  readImage(event: any, callback: any, obj: any) {

    var files = event.target.files;
    var file = files[0];
    var allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/xpng", "image/gif"];
    var a = allowedTypes.indexOf(file.type);
    if (a < 0) {
      alert("File type not allowed");
      obj.editCommunityForm.controls['communityLogo'].setValue('');
      return false;
    }
    this.formData.append('communityLogo', file, file.name);
    var reader = new FileReader();

    reader.onload = function (readerEvt: any) {
      callback(readerEvt.target.result, obj);
    };
    reader.readAsDataURL(file);

  }

  setAvatar(img: any, obj: any) {
    obj.editCommunityForm.controls['commLogo'].setValue(img);
  }

  removeLogo() {
    this.editCommunityForm.controls['commLogo'].setValue('');
  }

  ngAfterViewInit() {

  }


  ngOnInit() {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      this.loggedIn = true;
    }
    this.getAllServices();
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
          this.editCommunityForm.controls['commLogo'].setValue(this.communityDetails.communityLogo);

          var serviceControl: any = this.editCommunityForm.controls['serviceList'];
          if (this.communityDetails.services && this.communityDetails.services.length > 0) {
            for (let eachService of this.communityDetails.services) {
              var newControl = this.initService();
              serviceControl.push(newControl);
              newControl.controls['service'].setValue(eachService._id);
            }
          }else{
            var newControl = this.initService();
            serviceControl.push(newControl);
          }



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