import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService, UserServices } from '../../services/index';
import { ProfileModel } from '../../models/profile.model';
import { CustomValidator } from '../../validators/test.validator';

declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'editprofile',
  templateUrl: './editprofile.component.html'

})
export class EditprofileComponent implements AfterViewInit, OnInit {
  userProfile: any = {};

  profile = new ProfileModel(); //user profile interface or model

  profileUpdateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,
    private authenticationService: AuthenticationService, private userService: UserServices) {

    this.profileUpdateForm = this.fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      id: ['', Validators.required],
      username: ['', Validators.required],
      useremail: ['', Validators.required],
      userphone: '',
      addresslineone: ['', Validators.required],
      addresslinetwo: '',
      usercity: '',
      usercountry: ''
    });
    this.authenticationService.generatetoken()
      .subscribe(result => {
        if (result === false) {
          this.router.navigate(['/login']);
        }
      });


  }
  ngOnInit() {

    // initialize model here


    var userData = JSON.parse(localStorage.getItem('currentUser')).token;
    this.userService.getUserProfile(userData._id)
      .subscribe(data => {
        // this.profile = {
        //   id: data._id,
        //   username: data.name,
        //   useremail: data.email,
        //   userphone: data.phone,
        //   addresslineone: data.addresslineone,
        //   addresslinetwo: data.addresslinetwo,
        //   usercity: data.city,
        //   usercountry: data.country
        // }
        //Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])
        //Validators.pattern('[A-Za-z]{5}')
        this.profileUpdateForm = this.fb.group({
          // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
          id: [data._id, Validators.required],
          username: [data.name, Validators.compose([Validators.required, Validators.minLength(5)]),CustomValidator.usernameTaken],
          useremail: [data.email, Validators.compose([CustomValidator.validEmail,Validators.required])],
          userphone: data.phone,
          addresslineone: [data.addresslineone, Validators.required],
          addresslinetwo: data.addresslinetwo,
          usercity: data.city,
          usercountry: data.country
        });
      },
      error => {
        console.log(error);
      })
  }

  ngAfterViewInit() {

    $(document).ready(function () {
      $(".s-box").selectbox();
    });
  }

  profilePage() {
    this.router.navigate(['/profile']);
  }

  submitForm(): void {
    console.log('Reactive Form Data: ')
    console.log(this.profileUpdateForm.value);
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
  updateProfile() {
    this.userService.updateProfile(this.profile)
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