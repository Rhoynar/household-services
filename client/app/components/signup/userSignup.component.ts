import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService, AuthenticationService, UserServices } from '../../services/index';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
    moduleId: module.id,
    selector: 'user-signup',
    templateUrl: './userSignup.component.html'
    //styles: [main]
})
export class UserSignupComponent {


    pagetitle = "Register";


    loading = false;
    error = '';

    profileSignupForm: FormGroup;
    customValidator = new CustomValidator(this.http);


    constructor(
        private http: Http,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private UserServices: UserServices,
        private alertService: AlertService
    ) {

    }

    ngOnInit() {
        this.profileSignupForm = this.fb.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
            useremail: ['', Validators.compose([this.customValidator.validEmail, Validators.required]), Validators.composeAsync([this.customValidator.emailTaken.bind(this.customValidator)])],
            userpass: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
        });
    }


    registerUser() {


        this.UserServices.registerUser(this.profileSignupForm.value)
            .subscribe(data => {
                this.alertService.success(data.msg, 'login');
                this.router.navigate(['/login']);
                //return false;
            },
            error => {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                this.alertService.error(errr.msg, 'signup');
            }
            );
    }




}