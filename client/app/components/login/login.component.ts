import { Component, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserServices, AuthenticationService } from '../../services/index'
import { ProfileModel } from '../../models/profile.model';
import { CustomValidator } from '../../validators/custom.validator';

declare var $: any;



@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: './login.component.html'
    //styles: [main]
})
export class LoginComponent implements AfterViewInit, OnInit {

    useremail: String;
    userpass: String;

    loginuseremail: String;
    loginuserpass: String;
    loading = false;
    error = '';

    username: String;

    profileSignupForm: FormGroup;
    customValidator = new CustomValidator(this.http);

    constructor(
        private http: Http,
        private fb: FormBuilder,
        private router: Router,
        private UserServices: UserServices,
        private authenticationService: AuthenticationService) {
        // this.parties = Parties.find({}).zone();

    }

    ngAfterViewInit() {

    }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        this.profileSignupForm = this.fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            useremail: ['', Validators.compose([this.customValidator.validEmail, Validators.required]), Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
            userpass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        });
    }

    loginUser(event: any) {
        this.loading = true;
        this.authenticationService.login(this.loginuseremail, this.loginuserpass)
            .subscribe(result => {
                if (result === true) {
                    this.router.navigate(['/dashboard']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    registerUser() {


        this.UserServices.registerUser(this.profileSignupForm.value)
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
}