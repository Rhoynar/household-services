import { Component, ViewChild, ElementRef, AfterViewInit, OnChanges, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { UserServices, AuthenticationService, AlertService } from '../../services/index'
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
    returnUrl: string;
    constructor(
        private http: Http,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private UserServices: UserServices,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
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

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    loginUser(event: any) {
        this.loading = true;
        this.authenticationService.login(this.loginuseremail, this.loginuserpass)
            .subscribe(
                result => {
                if (result === true) {
                    this.router.navigate([this.returnUrl]);
                    //this.router.navigate(['/dashboard']);
                } else {
                    this.error = 'Username or password is incorrect';
                    
                    this.loading = false;
                }
            }, error => {
                // In a real world app, we might use a remote logging infrastructure
                let errMsg: string;
                if (error instanceof Response) {
                    const body = error.json() || '';
                    const err = body.error || JSON.stringify(body);
                    //errMsg = `${error.status} - ${error.statusText || ''} ${body.msg}`;
                    errMsg=body.msg;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                
                this.alertService.error(errMsg,'login');
                
                //return Observable.throw(errMsg);
                //let body = error.json();
                //return Observable.throw(body || { });
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
                
                this.alertService.error(errr.msg,'signup');
            }
            );
    }
}