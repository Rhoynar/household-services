import { Component, ViewChild, ElementRef, AfterViewInit, NgZone, OnInit } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AlertService, AuthenticationService, UserServices } from '../../services/index';
import { CustomValidator } from '../../validators/custom.validator';

@Component({
    moduleId: module.id,
    selector: 'forgot-pass',
    templateUrl: './forgotpass.component.html'
    //styles: [main]
})
export class ForgotPassComponent {


    pagetitle = "Forgot Password";


    loading = false;
    error = '';

    public forgotPassForm: FormGroup;
    public customValidator = new CustomValidator(this.http);


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
        this.forgotPassForm = this.fb.group({
            useremail: ['', Validators.compose([this.customValidator.validEmail,Validators.required])],
        });
    }


    submitForm() {


        this.UserServices.forgotPass(this.forgotPassForm.value)
            .subscribe(data => {
                this.alertService.success(data.msg, 'forgotpass');
                
                //this.router.navigate(['/confirmsignup/' + data.sort_msg]);
                //return false;
            },
            error => {
                const body = error.json() || '';
                const err = body.error || JSON.stringify(body);
                var errr = JSON.parse(err);
                this.alertService.error(errr.msg, 'forgotpass');
            }
            );
    }




}