import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserServices } from '../../services/index';
import { UserModel } from '../../models/user.model';
import { Http, Headers, Response } from '@angular/http';
import { CustomValidator } from '../../validators/custom.validator';

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'update-profile',
  templateUrl: './editUserProfile.component.html'

})
export class EditUserProfileComponent implements AfterViewInit, OnInit {
  
  public pagetitle:String="Update Profile";
  userProfile: any = {};

  profile = new UserModel(); //user profile interface or model

  profileUpdateForm: FormGroup;
  customValidator = new CustomValidator(this.http);
  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserServices
  ) {


    this.profileUpdateForm = this.fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      id: ['', Validators.required],
      //username: [data.name, Validators.compose([Validators.required, Validators.minLength(5)]),this.customValidator.usernameTaken],
      username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      useremail: ['', Validators.compose([this.customValidator.validEmail, Validators.required]), Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
      userphone: '',
      addresslineone: ['', Validators.required],
      addresslinetwo: '',
      usercity: '',
      usercountry: '',
      zipcode: [''],
    });

  }
  ngOnInit() {

    // initialize model here


    var userData = JSON.parse(localStorage.getItem('currentUser')).token;
    this.userService.getUserProfile(userData._id)
      .subscribe(data => {
        this.profileUpdateForm.controls['id'].setValue(data._id);
        this.profileUpdateForm.controls['username'].setValue(data.name);
        this.profileUpdateForm.controls['useremail'].setValue(data.email);
        this.profileUpdateForm.controls['userphone'].setValue(data.phone);
        this.profileUpdateForm.controls['addresslineone'].setValue(data.addresslineone);
        this.profileUpdateForm.controls['addresslinetwo'].setValue(data.addresslinetwo);
        this.profileUpdateForm.controls['usercity'].setValue(data.city);
        this.profileUpdateForm.controls['usercountry'].setValue(data.country);
        this.profileUpdateForm.controls['zipcode'].setValue(data.zipcode);
      },
      error => {
        console.log(error);
      })
  }

  ngAfterViewInit() {

    
  }

  profilePage() {
    this.router.navigate(['/profile']);
  }

  submitForm(): void {
    //console.log('Reactive Form Data: ')
    //console.log(this.profileUpdateForm.value);
    this.userService.updateProfile(this.profileUpdateForm.value)
      .subscribe(data => {
        if (data.status == 'error') {
          alert(data.error);

        } else {
          alert(data.msg);
          this.profilePage();
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


}