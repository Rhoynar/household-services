import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserServices } from '../../services/index'
import { ProfileModel } from '../../models/profile.model';
import { CustomValidator } from '../../validators/custom.validator';
declare var $: any;



@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: './signup.component.html',
  //styles: [main]
})
export class SignupComponent implements AfterViewInit, OnInit {
  // parties: Observable<any[]>;
  // parties: Observable<Party[]>;
  users: Observable<any[]>;
  username: String;
  useremail: String;
  userpass: String;


  profileSignupForm: FormGroup;
  customValidator = new CustomValidator(this.http);

  constructor(
    private http: Http,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServices) {
  }

  ngOnInit() {
    this.profileSignupForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      useremail: ['', Validators.compose([this.customValidator.validEmail, Validators.required]), Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
      userpass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],

    });
  }

  registerUser() {


    this.userService.registerUser(this.profileSignupForm.value)
      .subscribe(data => {
        alert(data.msg);
        this.router.navigate(['/login']);
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

}