import { Component, ViewChild, ElementRef, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CommunityServices } from '../../services/index';
import { UserModel } from '../../models/models';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'admin-add-community',
  templateUrl: './admin.add.community.component.html'

})
export class AdminAddCommunityComponent implements AfterViewInit, OnInit, OnDestroy {

  
  loggedIn: any = false;
  
  
  addCommunityForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  pagetitle="New Community";
  //constructor start
  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private communityServices: CommunityServices
    
  ) {

    this.addCommunityForm = this.fb.group({
      title: ['', Validators.required],
      addressLineOne: ['', Validators.required],
      addressLineTwo: [''],
      postcode: ['', Validators.required],
      phone: ['', Validators.required],
      communityLogo: [''],
      commLogo: ['']
    });
    
  }
  //end of constructor

  

  

  //get vendors
  communityPage() {
    
    this.router.navigate(['/admin/community']);
  }

  

  submitForm(): void {
    
    

    this.communityServices.addCommunity(this.addCommunityForm.value)
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
        
      }
      );
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
      obj.addCommunityForm.controls['communityLogo'].setValue('');
      return false;
    }
    
    var reader = new FileReader();

    reader.onload = function (readerEvt: any) {
      callback(readerEvt.target.result, obj);
    };
    reader.readAsDataURL(file);

  }

  setAvatar(img: any, obj: any) {
    obj.addCommunityForm.controls['commLogo'].setValue(img);
  }

  removeLogo(){
    this.addCommunityForm.controls['commLogo'].setValue('');
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